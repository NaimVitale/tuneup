import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}