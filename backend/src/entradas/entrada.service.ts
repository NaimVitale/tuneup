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

  // Método para listar entradas por usuario (o todas si no se pasa)
  async findAllByUsuario(id_usuario?: number) {
    const qb = this.entradaRepo.createQueryBuilder('entrada')
      .select([
        'entrada.id',
        'entrada.estado_entrada',
        'seccion.nombre',
        'concierto.id',
        'concierto.fecha',
        'artista.id',
        'artista.nombre',
        'recinto.id',
        'recinto.nombre',
        'recinto.ciudad'
      ])
      .leftJoin('entrada.seccion', 'seccion')
      .leftJoin('entrada.concierto', 'concierto')
      .leftJoin('concierto.artista', 'artista')
      .leftJoin('concierto.recinto', 'recinto');

    if (id_usuario) {
      qb.innerJoin('entrada.compra', 'compra')
        .innerJoin('compra.usuario', 'usuario')
        .andWhere('usuario.id = :id_usuario', { id_usuario });
    }

    return qb.getMany();
  }
}

