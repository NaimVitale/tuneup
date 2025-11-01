import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { ALLOWED_FILE_FIELDS, UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { ILike, Repository } from 'typeorm';
import slugify from 'slugify';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ArtistaService {
  constructor(
      @InjectRepository(Artista)
      private readonly artistaRepo: Repository<Artista>,
      private readonly uploadService: UploadService,
    ) {}
  
    async create(dto: CreateArtistaDto): Promise<Artista> {
    const slug = slugify(dto.nombre, { lower: true, strict: true });

    const artista = this.artistaRepo.create({
      ...dto,
      slug,
    });

    return this.artistaRepo.save(artista);
  }

  async searchByName(query: string) {
    return await this.artistaRepo
      .createQueryBuilder('artista')
      .leftJoin('artista.conciertos', 'concierto')
      .where('LOWER(artista.nombre) LIKE LOWER(:nombre)', { nombre: `%${query}%` })
      .select([
        'artista.id',
        'artista.nombre',
        'artista.slug',
        'artista.img_card',
      ])
      .addSelect('COUNT(concierto.id)', 'numConciertos')
      .groupBy('artista.id')
      .getRawMany();
  }

  async getAll() {
    return await this.artistaRepo.find();
  }

   async getAllPublic() {
    return await this.artistaRepo.find();
  }

  async findBySlug(slug: string) {
  const artista = await this.artistaRepo
    .createQueryBuilder('artista')
    .leftJoinAndSelect('artista.conciertos', 'concierto')
    .leftJoinAndSelect('concierto.recinto', 'recinto')
    .leftJoinAndSelect('concierto.artista', 'artista_concierto')
    .where('artista.slug = :slug', { slug })
    .select([
      'artista',
      'concierto.id',
      'concierto.fecha',
      'recinto.id',
      'recinto.ubicacion',

      'artista_concierto.id',
      'artista_concierto.nombre',
      'artista_concierto.slug',
      'artista_concierto.img_card',
    ])
    .getOne();

  return artista;
}

  async update(slug: string, dto: UpdateArtistaDto, files: Record<string, Express.Multer.File[]>) {
    const cleanSlug = slug.trim();
    const artista = await this.artistaRepo.findOne({ where: { slug: cleanSlug }, select: ['id', 'nombre', 'descripcion', 'slug', 'img_card', 'img_hero', 'images'],});

    if (!artista) throw new NotFoundException('Artista no encontrado 1');

    if (dto.nombre && dto.nombre !== artista.nombre) {
      const newSlug = slugify(dto.nombre, { lower: true, strict: true });
      const exists = await this.artistaRepo.findOne({ where: { slug: newSlug } });
      if (exists && exists.id !== artista.id) throw new BadRequestException('Ya existe un artista con ese nombre');
      artista.slug = newSlug;
    }

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined) artista[key] = value;
    });

    if (files) {
      for (const [key, fileArray] of Object.entries(files)) {
        if (ALLOWED_FILE_FIELDS.includes(key) && fileArray[0]) {
          const file = fileArray[0];
          const uploaded = await this.uploadService.handleUploads({ [key]: [file] }, 'tuneup/artistas', ALLOWED_FILE_FIELDS);
          artista[key] = uploaded[key];
        }
      }
    }

    return await this.artistaRepo.save(artista);
  }

  remove(id: number) {
    return `This action removes a #${id} artista`;
  }
}
