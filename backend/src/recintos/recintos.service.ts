import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { ALLOWED_FILE_FIELDS, Recinto } from './entities/recinto.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { Concierto, EstadoConcierto } from 'src/conciertos/entities/concierto.entity';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class RecintosService {
  constructor(
    @InjectRepository(Recinto) private repo: Repository<Recinto>,

    @InjectRepository(Concierto) private conciertoRepo: Repository<Concierto>,

    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateRecintoDto, files?: Record<string, Express.Multer.File[]>): Promise<Recinto> {
    const { nombre, ciudad, secciones, svg_map } = dto;

    // Validar secciones repetidas como antes
    const sec = secciones ?? [];
    if (sec.length > 1) {
      const nombres = sec.map(s => s.nombre?.trim().toLowerCase()).filter(Boolean);
      if (new Set(nombres).size !== nombres.length) {
        throw new BadRequestException('No puede haber secciones con nombres repetidos');
      }
    }

    const recinto = this.repo.create({
      nombre,
      svg_map: svg_map || null,
      ciudad: { id: ciudad } as Ciudad,
      secciones: secciones?.map(s => ({
        nombre: s.nombre.trim(),
        capacidad: s.capacidad,
        tipo_svg: s.tipo_svg,
        svg_path: s.svg_path,
      })) || []
    });

    // Subir imágenes a Cloudinary si vienen
    if (files) {
      for (const [key, fileArray] of Object.entries(files)) {
        if (ALLOWED_FILE_FIELDS.includes(key) && fileArray[0]) {
          const uploaded = await this.uploadService.handleUploads({ [key]: [fileArray[0]] }, 'tuneup/recintos', ALLOWED_FILE_FIELDS);
          recinto[key] = uploaded[key];
        }
      }
    }

    const saved = await this.repo.save(recinto);

    return saved;
  }

  findAllPublic(idCiudad?: number) {
    const whereCondition = idCiudad ? { ciudad: { id: idCiudad } } : {};

    return this.repo.find({
      select: {
        id: true,
        nombre: true,
        img_card: true,
      },
      relations: ['ciudad'],
      where: whereCondition,
    });
  }

  findAll(incluirEliminados = false) {
    const query = this.repo
      .createQueryBuilder('recinto')
      .leftJoinAndSelect('recinto.ciudad', 'ciudad')
      .loadRelationCountAndMap('recinto.seccionesCount', 'recinto.secciones');

    if (incluirEliminados) {
      query.withDeleted(); // incluye eliminados solo si se pasa true
    } else {
      query.andWhere('recinto.deleted_at IS NULL'); // oculta eliminados por defecto
    }

    return query.getMany();
  }

   findAllSelect() {
    return this.repo.find({
      select: {
        id:true,
        nombre:true
      }
    })
  }

  async findOnePublic(id: number) {
    const results = await this.repo
      .createQueryBuilder('recinto')
      .leftJoin('recinto.conciertos', 'concierto', 'concierto.estado != :finalizado', { finalizado: EstadoConcierto.FINALIZADO })
      .leftJoin('concierto.preciosPorSeccion', 'psc')
      .leftJoin('concierto.artista', 'artista')
      .leftJoin('recinto.ciudad', 'ciudad')
      .where('recinto.id = :id', { id })
      .select([
        'recinto.id',
        'recinto.nombre',
        'recinto.ubicacion',
        'recinto.img_card',
        'recinto.img_hero',
        'ciudad.id',
        'ciudad.nombre',
        'concierto.id',
        'concierto.fecha',
        'concierto.fecha_venta',
        'concierto.estado',
        'artista.id',
        'artista.nombre',
        'artista.slug',
        'artista.img_card',
        'MIN(psc.precio) AS precio_minimo',
      ])
      .groupBy('recinto.id, ciudad.id, concierto.id, artista.id')
      .getRawMany();

    if (!results.length) return null;

    const first = results[0];
    return {
      id: first.recinto_id,
      nombre: first.recinto_nombre,
      ubicacion: first.recinto_ubicacion,
      img_card: first.recinto_img_card,
      img_hero: first.recinto_img_hero,
      ciudad: {
        id: first.ciudad_id,
        nombre: first.ciudad_nombre,
      },
      conciertos: results
        .filter(r => r.concierto_id !== null)
        .map(r => ({
          id: r.concierto_id,
          fecha: r.concierto_fecha,
          fecha_venta: r.concierto_fecha_venta,
          estado: r.concierto_estado,
          precio_minimo: Number(r.precio_minimo),
          artista: {
            id: r.artista_id,
            nombre: r.artista_nombre,
            slug: r.artista_slug,
            img_card: r.artista_img_card,
          },
        })),
    };
  }


  findOne(id: number) {
    return this.repo.findOne({where: {id} , relations:['secciones'] });
  }

  async searchByName(query: string) {
    return this.repo.find({
      where: {
        nombre: ILike(`%${query}%`),
      },
    });
  }

  async update(id: number, dto: UpdateRecintoDto, files?: Record<string, Express.Multer.File[]>) {
    const recinto = await this.repo.findOne({
      where: { id },
      relations: ['secciones'],
    });

    if (!recinto) throw new NotFoundException('Recinto no encontrado');

    // Actualizar campos simples
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && key !== 'secciones' && key !== 'ciudad') {
        recinto[key] = value;
      }
    });

    // Actualizar ciudad
    if (dto.ciudad !== undefined && dto.ciudad !== null) {
      recinto.ciudad = { id: dto.ciudad } as Ciudad;
    }

    // Procesar secciones
    if (dto.secciones) {
      const incomingIds = dto.secciones.map(s => s.id).filter(Boolean);

      // Eliminar secciones que no vienen en DTO
      recinto.secciones = recinto.secciones.filter(s => incomingIds.includes(s.id));

      for (const s of dto.secciones) {
        if (!s.id && !s.nombre?.trim() && !s.capacidad) {
          throw new BadRequestException('Cada sección nueva debe tener al menos nombre o capacidad');
        }

        let seccion = s.id
          ? recinto.secciones.find(sec => sec.id === s.id) // actualizar existente
          : null;

        if (seccion) {
          // Actualizar existente
          seccion.nombre = s.nombre;
          seccion.capacidad = s.capacidad;
          seccion.tipo_svg = s.tipo_svg || '';
          seccion.svg_path = s.svg_path || '';
        } else if (s.nombre?.trim() || s.capacidad) {
          // Crear nueva sección solo si tiene nombre o capacidad
          seccion = new Seccion();
          seccion.nombre = s.nombre || '';
          seccion.capacidad = s.capacidad || 0;
          seccion.tipo_svg = s.tipo_svg || '';
          seccion.svg_path = s.svg_path || '';
          seccion.recinto = recinto;
          recinto.secciones.push(seccion);
        }
      }
    }

    // Manejar archivos
    if (files) {
      for (const [key, fileArray] of Object.entries(files)) {
        if (fileArray[0]) {
          const uploaded = await this.uploadService.handleUploads(
            { [key]: [fileArray[0]] },
            'tuneup/recintos',
            ['img_card', 'img_hero']
          );
          recinto[key] = uploaded[key];
        }
      }
    }

    const savedRecinto = await this.repo.save(recinto);

    return {
      id: savedRecinto.id,
      nombre: savedRecinto.nombre,
      ubicacion: savedRecinto.ubicacion,
      ciudad: savedRecinto.ciudad,
      svg_map: savedRecinto.svg_map,
      secciones: savedRecinto.secciones.map(s => ({
        id: s.id,
        nombre: s.nombre,
        capacidad: s.capacidad,
        tipo_svg: s.tipo_svg,
        svg_path: s.svg_path,
      })),
    };
  }

  async softDelete(id: number) {
    const recinto = await this.repo.findOne({ where: { id }, relations: ['conciertos'] });
    if (!recinto) throw new NotFoundException('Recinto no encontrado');

    // Soft delete de conciertos asociados usando el repository
    if (recinto.conciertos?.length) {
      await Promise.all(
        recinto.conciertos.map(c => this.conciertoRepo.softRemove(c))
      );
    }

    await this.repo.softDelete(id);

    return { message: 'Recinto eliminado correctamente', id, conciertos: recinto.conciertos.map(c => c.id) };
  }

  async restore(id: number) {
    const recinto = await this.repo.findOne({
      where: { id },
      relations: ['conciertos'],
      withDeleted: true,
    });
    if (!recinto) throw new NotFoundException('Recinto no encontrado');

    await this.repo.restore(id);

    // Restaurar conciertos asociados usando el repository
    if (recinto.conciertos?.length) {
      await Promise.all(
        recinto.conciertos.map(c => this.conciertoRepo.restore(c.id))
      );
    }

    return { message: 'Recinto restaurado correctamente', id, conciertos: recinto.conciertos.map(c => c.id) };
  }
}
