import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { ReadArtistaDto } from './dto/read-artista.dto';

@Injectable()
export class ArtistaService {
  constructor(
      @InjectRepository(Artista)
      private readonly artistaRepo: Repository<Artista>,
    ) {}
  
    async create(dto: CreateArtistaDto): Promise<Artista> {
    const slug = slugify(dto.nombre, { lower: true, strict: true });

    const artista = this.artistaRepo.create({
      ...dto,
      slug,
    });

    return this.artistaRepo.save(artista);
  }

  async getAll() {
    return await this.artistaRepo.find();
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

  async update(id: number, dto: UpdateArtistaDto) {
    const artista = await this.artistaRepo.findOne({ where: { id }, select: ['id', 'nombre', 'descripcion', 'slug', 'img_card', 'img_hero', 'images'] });

    if (!artista) throw new NotFoundException('Artista no encontrado');

    if (dto.nombre && dto.nombre !== artista.nombre) {
      const newSlug = slugify(dto.nombre, { lower: true, strict: true });
      const exists = await this.artistaRepo.findOne({ where: { slug: newSlug } });
      if (exists && exists.id !== id) throw new BadRequestException('Ya existe un artista con ese nombre');
      artista.slug = newSlug;
    }

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined) artista[key] = value;
    });

    return await this.artistaRepo.save(artista);

  }

  remove(id: number) {
    return `This action removes a #${id} artista`;
  }
}
