import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { Recinto } from './entities/recinto.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';

@Injectable()
export class RecintosService {
  constructor(
    @InjectRepository(Recinto) private repo: Repository<Recinto>,
  ) {}

  async create(dto: CreateRecintoDto) {
    const { nombre, ciudad, secciones, svg_map } = dto;

    const sec = secciones ?? [];

    if (sec.length > 1) {
      const nombres = sec
        .map(s => s.nombre?.trim().toLowerCase())
        .filter(Boolean);

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

    const saved = await this.repo.save(recinto);

    return {
      id: saved.id,
      nombre: saved.nombre,
      ciudad: saved.ciudad,
      svg_map: saved.svg_map,
      secciones: saved.secciones,
    };
  }

  findAll() {
    return this.repo
      .createQueryBuilder('recinto')
      .leftJoinAndSelect('recinto.ciudad', 'ciudad')
      .loadRelationCountAndMap('recinto.seccionesCount', 'recinto.secciones')
      .getMany();
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

  async update(id: number, dto: UpdateRecintoDto) {
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



  remove(id: number) {
    return `This action removes a #${id} recinto`;
  }
}
