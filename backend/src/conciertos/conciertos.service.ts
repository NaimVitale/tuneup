import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concierto } from './entities/concierto.entity';
import { Repository } from 'typeorm';
import { PreciosSeccionConciertoService } from 'src/precios-seccion-concierto/precios-seccion-concierto.service';
import { PreciosSeccionConcierto } from 'src/precios-seccion-concierto/entities/precios-seccion-concierto.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';


@Injectable()
export class ConciertosService {
  constructor(
    @InjectRepository(Concierto)
    private readonly conciertoRepository: Repository<Concierto>,

    @InjectRepository(PreciosSeccionConcierto)
    private preciosRepo: Repository<PreciosSeccionConcierto>,

    @InjectRepository(Seccion)
    private seccionRepo: Repository<Seccion>,

    private readonly preciosService: PreciosSeccionConciertoService,
  ) {}

  create(createConciertoDto: CreateConciertoDto) {
    return 'This action adds a new concierto';
  }

  findAll(filtroGenero?: string, fechaInicio?: string) {
    const query = this.conciertoRepository
      .createQueryBuilder('concierto')
      .leftJoinAndSelect('concierto.artista', 'artista')
      .leftJoinAndSelect('artista.genero', 'genero')
      .leftJoinAndSelect('concierto.recinto', 'recinto')
      .leftJoinAndSelect('recinto.ciudad', 'ciudad')
      .leftJoin('concierto.preciosPorSeccion', 'psc')
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
        'ciudad.id',
        'ciudad.nombre',
        'genero.id',
        'genero.nombre',
      ])
      .addSelect('MIN(psc.precio)', 'precio_minimo')
      .groupBy('concierto.id')
      .addGroupBy('artista.id')
      .addGroupBy('recinto.id')
      .addGroupBy('ciudad.id')
      .addGroupBy('genero.id')
      .cache(true);

    // Filtro por género
    if (filtroGenero) {
      query.andWhere('LOWER(genero.nombre) = LOWER(:nombre)', { nombre: filtroGenero });
    }

    // Filtro a partir de fecha
    if (fechaInicio) {
      const inicio = new Date(fechaInicio);
      query.andWhere('concierto.fecha >= :inicio', { inicio: fechaInicio });
    }

    return query.getRawMany();
  }

  async findOnePublic(id: number) {
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: ['recinto', 'recinto.secciones', 'artista'],
      select: {
        artista: {
          nombre: true,
          img_card: true,
          slug: true,
        },
      },
    });

    if (!concierto) return null;

    const precios = await this.preciosService.findByConcierto(id);

    concierto.recinto.secciones = concierto.recinto.secciones.map(seccion => {
      const precio = precios.find(p => p.seccion.id === seccion.id);
      return { ...seccion, precio: precio?.precio || null };
    });

    return concierto;
  }

  async findOne(id: number) {
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: [
        'recinto', 
        'recinto.secciones', 
        'artista', 
        'preciosPorSeccion',
        'preciosPorSeccion.seccion'
      ],
      select: {
        artista: { id: true, nombre: true },
      },
    });

    if (!concierto) return null;

    const seccionesConPrecio = concierto.recinto.secciones.map(seccion => {
      const precioObj = concierto.preciosPorSeccion.find(
        p => p.seccion.id === seccion.id
      );
      return {
        ...seccion,
        precio: precioObj?.precio ?? 0,
      };
    });

    return {
      ...concierto,
      recinto: {
        ...concierto.recinto,
        secciones: seccionesConPrecio,
      },
    };
  }

  async update(id: number, dto: UpdateConciertoDto) {
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: ['preciosPorSeccion', 'preciosPorSeccion.seccion', 'artista', 'recinto']
    });

    if (!concierto)
      throw new NotFoundException('Concierto no encontrado');

    
    if (dto.fecha) concierto.fecha = dto.fecha;
    if (dto.id_artista) concierto.id_artista = dto.id_artista;
    if (dto.id_recinto) concierto.id_recinto = dto.id_recinto;

    
    if (dto.preciosPorSeccion) {
      for (const p of dto.preciosPorSeccion) {
        // Si viene id => Update
        if (p.id) {
          const precioExistente = concierto.preciosPorSeccion.find(pr => pr.id === p.id);
          if (precioExistente) {
            precioExistente.precio = p.precio;
          }
        } else {
          // No crear si el precio es 0
          if (p.precio <= 0) continue;

          const seccion = await this.seccionRepo.findOne({
            where: { id: p.id_seccion }
          });
          if (!seccion)
            throw new NotFoundException(`Sección ${p.id_seccion} no encontrada`);

          if (seccion.capacidad <= 0) continue;

          const nuevoPrecio = this.preciosRepo.create({
            concierto,
            seccion,
            precio: p.precio,
            capacidad_disponible: seccion.capacidad
          });

          concierto.preciosPorSeccion.push(nuevoPrecio);
        }
      }
    }

    await this.conciertoRepository.save(concierto);
    return concierto;
  }

  remove(id: number) {
    return `This action removes a #${id} concierto`;
  }
}
