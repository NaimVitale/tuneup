// src/stripe/stripe.controller.ts
import { Controller, Post, Req, Res, Body, Headers, Logger, Get } from '@nestjs/common';
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
  private readonly logger = new Logger(StripeController.name)

  constructor(
    private readonly stripeService: StripeService,
    private readonly compraService: CompraService,
    private readonly entradaService: EntradaService,
    private readonly preciosService: PreciosSeccionConciertoService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Post('checkout')
  async createCheckout(
    @Body() body: { items: any[]; id_usuario: number },
    @Res() res: Response
  ) {
    // Validación de usuario
    if (!body.id_usuario) {
      return res.status(400).json({ error: 'Falta id_usuario' });
    }

    // Validar cada item antes del checkout
    for (const item of body.items) {
      if (!item.id_precio_stripe || !item.quantity) {
        return res.status(400).json({ error: 'Item inválido' });
      }

      const precioEntity = await this.preciosService.findByStripeId(item.id_precio_stripe);
      if (!precioEntity) {
        return res.status(404).json({ error: 'Precio no encontrado en DB' });
      }

      if (precioEntity.capacidad_disponible < item.quantity) {
        return res.status(400).json({
          error: `Stock insuficiente: quedan ${precioEntity.capacidad_disponible} en ${precioEntity.seccion.nombre}`,
        });
      }
    }

    // Si todo ok, generamos Checkout Session
    const line_items = body.items.map(item => ({
      price: item.id_precio_stripe,
      quantity: item.quantity,
    }));

    try {
      const session = await this.stripeService.createCheckoutSession(line_items, {
        id_usuario: body.id_usuario.toString(),
      });

      return res.json({ url: session.url });

    } catch (err: any) {
      return res.status(500).json({
        error: 'Error creando sesión de pago',
        details: err.message,
      });
    }
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    // Validación firma
    if (!sig || Array.isArray(sig)) {
      this.logger.warn('Firma inválida en webhook');
      return res.status(400).send('Invalid signature');
    }

    let event: Stripe.Event;
    try {
      event = this.stripeService.constructEvent(req.body, sig);
    } catch (err: any) {
      this.logger.warn('Error construyendo evento Stripe: ' + err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Solo nos interesa checkout.session.completed (puede adaptarse)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata?.id_usuario) {
        this.logger.warn('Webhook: no hay metadata.id_usuario');
        // devolver 400 para que Stripe reintente si falta metadata.
        return res.status(400).send('No user metadata');
      }

      try {
        await this.dataSource.transaction(async manager => {
          // Guardar compra
          const compra = await this.compraService.create(
            {
              id_usuario: Number(session.metadata?.id_usuario),
              total: (session.amount_total ?? 0) / 100,
              stripe_payment_id: session.payment_intent as string,
            },
            manager,
          );

          // Traer line items de Stripe
          const line_items = await this.stripeService.listLineItems(session.id);

          // Por cada item -> lock de la fila precio y validar stock
          for (const item of line_items.data) {
            // Buscar price entity por id_precio_stripe (usa el repo via manager)
            const precioEntity = await this.preciosService.findByStripeId(item.price!.id, manager);
            if (!precioEntity) {
              this.logger.warn(`No existe precio en DB para ${item.price!.id} — saltando`);
              continue;
            }

            // Bloqueo pesimista en la fila del precio (evita race conditions)
            // Nota: si tu findByStripeId devolvió entidad real, bloqueamos por id con queryBuilder:
            const precioLocked = await manager
              .getRepository(precioEntity.constructor as any)
              .createQueryBuilder('precio')
              .setLock('pessimistic_write')
              .leftJoinAndSelect('precio.concierto', 'concierto')
              .leftJoinAndSelect('precio.seccion', 'seccion')
              .where('precio.id = :id', { id: precioEntity.id })
              .getOne();


            if (!precioLocked) {
              throw new Error('Precio no disponible al bloquear');
            }

            if (precioLocked.capacidad_disponible < item.quantity!) {
              // No hay stock suficiente: revertir (lanza para rollback)
              throw new Error(`Stock insuficiente para precio ${precioLocked.id} — disponible ${precioLocked.capacidad_disponible}, pedido ${item.quantity}`);
            }

            // Crear las entradas
            const entradas: Partial<any>[] = [];
            for (let i = 0; i < item.quantity!; i++) {
              entradas.push({
                id_compra: compra.id,
                id_concierto: precioLocked.concierto.id,
                id_seccion: precioLocked.seccion.id,
                estado_entrada: 'activa',
              });
            }

            await this.entradaService.createMany(entradas, manager);

            // Descontar stock
            precioLocked.capacidad_disponible -= item.quantity!;
            await manager.save(precioLocked);
          } // fin for items
        }); // fin transaction

        this.logger.log(`Compra registrada correctamente para session ${session.id}`);
      } catch (err: any) {
        // Si algo falla, hacemos roll back y devolvemos error (Stripe reintentará)
        this.logger.error('Error en webhook al registrar compra: ' + (err.message ?? err));
        return res.status(500).send('Internal webhook handler error');
      }
    }

    // Responder OK para evitar reintentos innecesarios (si el procesamiento fue OK arriba)
    return res.json({ received: true });
  }

  @Get('ganancias-mensuales')
  async gananciasMensuales() {
    const total = await this.stripeService.getGananciasMensuales();
    return { total: total / 100 };
  }
}
