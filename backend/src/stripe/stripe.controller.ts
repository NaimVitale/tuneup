// src/stripe/stripe.controller.ts
import { Controller, Post, Req, Res, Body, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CompraService } from '../compras/compra.service';
import { EntradaService } from '../entradas/entrada.service';
import { DataSource } from 'typeorm';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { PreciosSeccionConciertoService } from 'src/precios-seccion-concierto/precios-seccion-concierto.service';
import { InjectDataSource } from '@nestjs/typeorm';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly compraService: CompraService,
    private readonly entradaService: EntradaService,
    private readonly preciosService: PreciosSeccionConciertoService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Post('checkout')
  async createCheckout(@Body() body: { items: any[]; id_usuario: number }, @Res() res: Response) {
    console.log('[Checkout] Items recibidos:', body.items);
    console.log('[Checkout] Usuario ID:', body.id_usuario);

    const line_items = body.items.map(item => ({
      price: item.id_precio_stripe,
      quantity: item.quantity || 1,
    }));

    console.log('[Checkout] Line items preparados para Stripe:', line_items);

    const session = await this.stripeService.createCheckoutSession(line_items, {
      id_usuario: body.id_usuario.toString(), // metadata debe ser string
    });

    console.log('[Checkout] Sesión de Stripe creada:', session.id);

    res.json({ url: session.url });
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    console.log('[Webhook] Evento recibido');
    if (!sig || Array.isArray(sig)) {
      console.error('[Webhook] Firma inválida');
      return res.status(400).send('Invalid signature');
    }

    let event: Stripe.Event;
    try {
      event = this.stripeService.constructEvent(req.body, sig);
      console.log('[Webhook] Evento Stripe parseado:', event.type);
    } catch (err: any) {
      console.error('[Webhook] Error al construir evento:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('[Webhook] Checkout session completada:', session.id);

      if (!session.metadata?.id_usuario) {
        console.error('[Webhook] No se encontró metadata de usuario');
        return res.status(400).send('No user metadata');
      }

      await this.dataSource.transaction(async manager => {
        console.log('[Webhook] Iniciando transacción para registrar compra y entradas');

        // 1️⃣ Guardar compra
        console.log('[Webhook] Metadata de usuario:', session.metadata?.id_usuario);
        const compra = await this.compraService.create(
          {
            id_usuario: Number(session.metadata?.id_usuario),
            total: (session.amount_total ?? 0) / 100,
            stripe_payment_id: session.payment_intent as string,
          },
          manager,
        );
        console.log('[Webhook] Compra creada:', compra);

        // 2️⃣ Listar items
        const line_items = await this.stripeService.listLineItems(session.id);
        console.log('[Webhook] Line items de la sesión:', line_items.data);

        // 3️⃣ Crear entradas y actualizar capacidad
        for (const item of line_items.data) {
          const precioEntity = await this.preciosService.findByStripeId(item.price!.id, manager);
          if (!precioEntity) {
            console.warn('[Webhook] No se encontró precio en DB para:', item.price!.id);
            continue;
          }

          console.log('[Webhook] Precio encontrado:', precioEntity.id, 'Capacidad disponible:', precioEntity.capacidad_disponible);

          const entradas: Partial<any>[] = [];
          for (let i = 0; i < item.quantity!; i++) {
            entradas.push({
              id_compra: compra.id,
              id_concierto: precioEntity.concierto.id,
              id_seccion: precioEntity.seccion.id,
              estado_entrada: 'activa',
            });
          }

          console.log('[Webhook] Creando entradas:', entradas.length);
          await this.entradaService.createMany(entradas, manager);

          precioEntity.capacidad_disponible -= item.quantity!;
          console.log('[Webhook] Nueva capacidad disponible:', precioEntity.capacidad_disponible);
          await manager.save(precioEntity);
        }

        console.log('[Webhook] Transacción completada');
      });

      console.log('[Webhook] Compra y entradas registradas correctamente');
    }

    res.json({ received: true });
  }
}