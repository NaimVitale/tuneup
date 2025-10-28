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
