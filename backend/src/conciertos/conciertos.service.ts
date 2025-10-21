import { Injectable } from '@nestjs/common';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concierto } from './entities/concierto.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ConciertosService {
  constructor(
    @InjectRepository(Concierto)
    private readonly conciertoRepository: Repository<Concierto>,
  ) {}

  create(createConciertoDto: CreateConciertoDto) {
    return 'This action adds a new concierto';
  }

  findAll() {
    return this.conciertoRepository
    .createQueryBuilder('concierto')
    .leftJoinAndSelect('concierto.artista', 'artista')
    .leftJoinAndSelect('concierto.recinto', 'recinto')
    .select([
      'concierto.id',
      'concierto.fecha',
      'artista.id',
      'artista.nombre',
      'artista.img_card',
      'artista.slug',
      'recinto.id',
      'recinto.nombre',
      'recinto.ubicacion',
    ])
    .orderBy('concierto.fecha', 'ASC')
    .getMany();
  }

  async findOne(id: number) {
    return this.conciertoRepository.findOne({
      where: { id },
      relations: ['recinto', 'artista'],
      select: {
        artista: {
          nombre: true,
          img_card: true,
          slug: true,
        },
      },
    });
  }

  update(id: number, updateConciertoDto: UpdateConciertoDto) {
    return `This action updates a #${id} concierto`;
  }

  remove(id: number) {
    return `This action removes a #${id} concierto`;
  }
}
