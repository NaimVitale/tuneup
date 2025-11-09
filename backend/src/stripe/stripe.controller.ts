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
    const line_items = body.items.map(item => ({
      price: item.id_precio_stripe,
      quantity: item.quantity || 1,
    }));

    const session = await this.stripeService.createCheckoutSession(line_items, {
      id_usuario: body.id_usuario.toString(),
    });

    res.json({ url: session.url });
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    if (!sig || Array.isArray(sig)) {
      return res.status(400).send('Invalid signature');
    }

    let event: Stripe.Event;
    try {
      event = this.stripeService.constructEvent(req.body, sig);
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata?.id_usuario) {
        return res.status(400).send('No user metadata');
      }

      await this.dataSource.transaction(async manager => {
        const compra = await this.compraService.create(
          {
            id_usuario: Number(session.metadata?.id_usuario),
            total: (session.amount_total ?? 0) / 100,
            stripe_payment_id: session.payment_intent as string,
          },
          manager,
        );

        const line_items = await this.stripeService.listLineItems(session.id);

        for (const item of line_items.data) {
          const precioEntity = await this.preciosService.findByStripeId(item.price!.id, manager);
          if (!precioEntity) continue;

          const entradas: Partial<any>[] = [];
          for (let i = 0; i < item.quantity!; i++) {
            entradas.push({
              id_compra: compra.id,
              id_concierto: precioEntity.concierto.id,
              id_seccion: precioEntity.seccion.id,
              estado_entrada: 'activa',
            });
          }

          await this.entradaService.createMany(entradas, manager);

          precioEntity.capacidad_disponible -= item.quantity!;
          await manager.save(precioEntity);
        }
      });
    }

    res.json({ received: true });
  }
}
