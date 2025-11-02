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

  async getAllPublic(filtroGenero?: string) {
    const where: any = {};

    if (filtroGenero) {
      where.genero = { nombre: filtroGenero };
    }

    return this.artistaRepo.find({ 
      where, 
      relations: ['genero']
    });
  }

  async findBySlug(slug: string) {
    const results = await this.artistaRepo
      .createQueryBuilder('artista')
      .leftJoin('artista.conciertos', 'concierto')
      .leftJoin('concierto.recinto', 'recinto')
      .leftJoin('recinto.ciudad', 'ciudad')
      .leftJoin('concierto.artista', 'artista_concierto')
      .leftJoin('concierto.preciosPorSeccion', 'psc')
      .where('artista.slug = :slug', { slug })
      .select([
        'artista.id',
        'artista.nombre',
        'artista.slug',
        'artista.img_card',
        'artista.img_hero',
        'artista.images',
        'artista.descripcion',
        'concierto.id',
        'concierto.fecha',
        'MIN(psc.precio) AS precio_minimo',
        'recinto.id',
        'recinto.nombre',
        'recinto.ubicacion',
        'ciudad.id',
        'ciudad.nombre',
        'artista_concierto.id',
        'artista_concierto.nombre',
        'artista_concierto.slug',
        'artista_concierto.img_card',
      ])
      .groupBy('artista.id, concierto.id, recinto.id, ciudad.id, artista_concierto.id')
      .getRawMany();

    if (!results.length) return null;

    const first = results[0];
    return {
      id: first.artista_id,
      nombre: first.artista_nombre,
      slug: first.artista_slug,
      img_card: first.artista_img_card,
      img_hero: first.artista_img_hero,
      images: first.artista_images,
      descripcion: first.artista_descripcion,
      conciertos: results.map(row => ({
        id: row.concierto_id,
        fecha: row.concierto_fecha,
        precio_minimo: row.precio_minimo,
        recinto: {
          id: row.recinto_id,
          nombre: row.recinto_nombre,
          ubicacion: row.recinto_ubicacion,
          ciudad: {
            id: row.ciudad_id,
            nombre: row.ciudad_nombre,
          },
        },
        artista: {
          id: row.artista_concierto_id,
          nombre: row.artista_concierto_nombre,
          slug: row.artista_concierto_slug,
          img_card: row.artista_concierto_img_card,
        },
      })),
    };
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
