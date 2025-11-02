import { Injectable } from '@nestjs/common';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concierto } from './entities/concierto.entity';
import { ILike, Repository, DataSource} from 'typeorm';
import { PreciosSeccionConciertoService } from 'src/precios-seccion-concierto/precios-seccion-concierto.service';


@Injectable()
export class ConciertosService {
  constructor(
    @InjectRepository(Concierto)
    private readonly conciertoRepository: Repository<Concierto>,

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
      .orderBy('concierto.fecha', 'ASC')
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

  async findOne(id: number) {
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

  update(id: number, updateConciertoDto: UpdateConciertoDto) {
    return `This action updates a #${id} concierto`;
  }

  remove(id: number) {
    return `This action removes a #${id} concierto`;
  }
}
