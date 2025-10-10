import { Injectable } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistaService {
  constructor(
      @InjectRepository(Artista)
      private readonly artistaRepo: Repository<Artista>,
    ) {}
  
  create(createArtistaDto: CreateArtistaDto) {
    return 'This action adds a new artista';
  }

  findAll() {
    return `This action returns all artistas`;
  }

  async findBySlug(slug: string) {
    const artista = await this.artistaRepo
      .createQueryBuilder('artista')
      .leftJoinAndSelect('artista.conciertos', 'concierto')
      .leftJoinAndSelect('concierto.recinto', 'recinto')
      .where('artista.slug = :slug', { slug })
      .select([
        'artista',
        'concierto.id',
        'concierto.fecha',
        'recinto.id',
        'recinto.nombre',
      ])
      .getOne();

    return artista;
  }

  update(id: number, updateArtistaDto: UpdateArtistaDto) {
    return `This action updates a #${id} artista`;
  }

  remove(id: number) {
    return `This action removes a #${id} artista`;
  }
}
