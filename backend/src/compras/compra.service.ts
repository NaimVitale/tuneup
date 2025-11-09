// src/compras/compra.service.ts
import { Injectable } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepo: Repository<Compra>,
  ) {}

  async create(data: Partial<Compra>, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(Compra) : this.compraRepo;
    const entity = repo.create(data);
    return repo.save(entity);
  }

  async findByStripePaymentId(stripePaymentId: string) {
    return this.compraRepo
      .createQueryBuilder('compra')
      .leftJoinAndSelect('compra.entradas', 'entrada')
      .leftJoinAndSelect('entrada.seccion', 'seccion')
      .leftJoinAndSelect('entrada.concierto', 'concierto')
      .leftJoinAndSelect('concierto.artista', 'artista')
      .leftJoinAndSelect('concierto.recinto', 'recinto')
      .leftJoin('compra.usuario', 'usuario')
      .addSelect(['usuario.id', 'usuario.nombre', 'usuario.email'])
      // <-- join para obtener el precio de la entrada
      .leftJoinAndMapOne(
        'entrada.precio',
        'precios_seccion_concierto', // nombre de la tabla o entidad
        'precio',
        'precio.id_concierto = entrada.id_concierto AND precio.id_seccion = entrada.id_seccion'
      )
      .where('compra.stripe_payment_id = :stripePaymentId', { stripePaymentId })
      .getOne();
  }
}
