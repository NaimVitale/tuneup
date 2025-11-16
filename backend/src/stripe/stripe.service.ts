// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('stripe.secretKey')!, {
      apiVersion: '2025-10-29.clover',
    });
  }

  async createCheckoutSession(
    line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
    metadata?: Record<string, any>,
  ) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      metadata,
      success_url: `${this.configService.get<string>('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/cancel`,
    });
    return session;
  }

  constructEvent(payload: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.get<string>('stripe.webhookSecret')!,
    );
  }

  async listLineItems(sessionId: string) {
    return this.stripe.checkout.sessions.listLineItems(sessionId);
  }

  async retrieveCheckoutSession(checkoutSessionId: string): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(checkoutSessionId, {
        expand: ['line_items'],
      });
      return session;
    } catch (err) {
      console.error('[StripeService] Error al recuperar sesión:', err);
      throw new Error('No se pudo recuperar la sesión de Stripe');
    }
  }
  

  async getGananciasMensuales() {
    const now = new Date();
    const startOfMonth = Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000);
    const endOfMonth = Math.floor(new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime() / 1000);

    let total = 0;

    await this.stripe.paymentIntents.list({ limit: 100 }).autoPagingEach(async (pi) => {
      if (
        pi.status === 'succeeded' &&
        pi.created >= startOfMonth &&
        pi.created <= endOfMonth
      ) {
        total += pi.amount ?? 0;
      }
    });

    return total; // en centavos
  }

  async getGananciasHoy() {
    const now = new Date();

    // Inicio y fin del día actual
    const startOfDay = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime() / 1000);
    const endOfDay = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime() / 1000);

    let total: number = 0;

    await this.stripe.paymentIntents.list({
      limit: 100,
      created: { gte: startOfDay, lte: endOfDay }
    }).autoPagingEach((pi) => {
      if (pi.status === 'succeeded') {
        total += pi.amount ?? 0;
      }
    });

    return total 
  }
}

