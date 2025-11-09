import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2025-10-29.clover',
    });
  }

  @Post()
  async handleStripeEvent(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    const payload = req.body;

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!,
      );

      switch (event.type) {
        case 'checkout.session.completed':
          console.log('Pago completado', event.data.object);
          break;
        case 'payment_intent.succeeded':
          console.log('Pago exitoso', event.data.object);
          break;
        default:
          console.log(`Evento recibido: ${event.type}`);
      }

      res.status(200).send('ok');
    } catch (err: any) {
      console.log('Error webhook:', err.message);
      res.status(400).send(`Webhook error: ${err.message}`);
    }
  }
}
