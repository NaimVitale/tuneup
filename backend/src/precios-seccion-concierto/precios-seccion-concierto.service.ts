import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PreciosSeccionConcierto } from './entities/precios-seccion-concierto.entity';

@Injectable()
export class PreciosSeccionConciertoService {
  constructor(
    @InjectRepository(PreciosSeccionConcierto)
    private readonly precioRepo: Repository<PreciosSeccionConcierto>,
  ) {}

  async findByConcierto(conciertoId: number) {
    return this.precioRepo.find({
      where: { concierto: { id: conciertoId } },
      relations: ['seccion'],
    });
  }

  async findByStripeId(id: string, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(PreciosSeccionConcierto) : this.precioRepo;
    return repo.findOne({
      where: { id_precio_stripe: id },
      relations: ['concierto', 'seccion'],
    });
  }
}