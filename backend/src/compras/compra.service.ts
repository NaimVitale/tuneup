// src/compras/compra.service.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepo: Repository<Compra>,

    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
  ) {}

  async create(data: Partial<Compra>, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(Compra) : this.compraRepo;
    const entity = repo.create(data);
    return repo.save(entity);
  }

  async findByCheckoutSessionId(checkoutSessionId: string) {
    // 1️⃣ Recuperar la sesión de Stripe
    const session = await this.stripeService.retrieveCheckoutSession(checkoutSessionId);

    if (!session || !session.payment_intent) {
      throw new Error('No se encontró payment_intent para esta sesión');
    }

    const stripePaymentId = session.payment_intent as string;

    // 2️⃣ Buscar la compra en DB usando payment_intent
    return this.compraRepo
    .createQueryBuilder('compra')
    .select([
      'compra.id',
      'compra.total',
      'compra.fecha_creacion',
    ])
    .leftJoin('compra.usuario', 'usuario')
    .addSelect(['usuario.id', 'usuario.nombre', 'usuario.email'])
    .leftJoin('compra.entradas', 'entrada')
    .addSelect(['entrada.id', 'entrada.estado_entrada'])
    .leftJoin('entrada.seccion', 'seccion')
    .addSelect(['seccion.id', 'seccion.nombre'])
    .leftJoinAndMapOne(
      'entrada.precio',
      'precios_seccion_concierto',
      'precio',
      'precio.id_concierto = entrada.id_concierto AND precio.id_seccion = entrada.id_seccion'
    )
    .leftJoin('entrada.concierto', 'concierto') // solo para obtener el concierto una vez
    .addSelect(['concierto.id', 'concierto.fecha'])
    .leftJoin('concierto.artista', 'artista')
    .addSelect(['artista.id', 'artista.nombre'])
    .leftJoin('concierto.recinto', 'recinto')
    .addSelect(['recinto.id', 'recinto.nombre', 'recinto.ciudad'])
    .where('compra.stripe_payment_id = :stripePaymentId', { stripePaymentId })
    .getOne();
  }
}
