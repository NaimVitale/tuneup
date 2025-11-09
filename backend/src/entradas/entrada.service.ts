// src/entradas/entrada.service.ts
import { Injectable } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrada } from './entities/entrada.entity';

@Injectable()
export class EntradaService {
  constructor(
    @InjectRepository(Entrada)
    private readonly entradaRepo: Repository<Entrada>,
  ) {}

  async createMany(entradas: Partial<Entrada>[], manager?: EntityManager) {
    const repo = manager ? manager.getRepository(Entrada) : this.entradaRepo;
    const entities = repo.create(entradas);
    return repo.save(entities);
  }
}

