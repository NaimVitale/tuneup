import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concierto, EstadoConcierto } from './entities/concierto.entity';
import { Repository } from 'typeorm';
import { PreciosSeccionConciertoService } from 'src/precios-seccion-concierto/precios-seccion-concierto.service';
import { PreciosSeccionConcierto } from 'src/precios-seccion-concierto/entities/precios-seccion-concierto.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Recinto } from 'src/recintos/entities/recinto.entity';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Artista } from 'src/artistas/entities/artista.entity';

@Injectable()
export class ConciertosService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,

    @InjectRepository(Concierto)
    private readonly conciertoRepository: Repository<Concierto>,

    @InjectRepository(PreciosSeccionConcierto)
    private preciosRepo: Repository<PreciosSeccionConcierto>,

    @InjectRepository(Seccion)
    private seccionRepo: Repository<Seccion>,

    @InjectRepository(Recinto)
    private recintoRepo: Repository<Recinto>,

    @InjectRepository(Artista)
    private artistaRepo: Repository<Artista>,

    private readonly preciosService: PreciosSeccionConciertoService,
  )  {
    const secretKey = this.configService.get<string>('stripe.secretKey');
    if (!secretKey) throw new Error('Stripe secret key not defined');

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-10-29.clover',
    });
  }

  async create(createConciertoDto: CreateConciertoDto) {
    const { id_recinto, fecha, fecha_venta, id_artista, preciosPorSeccion } = createConciertoDto;

    const ahora = new Date();

    // 1️⃣ Buscar el recinto y sus secciones
    const recinto = await this.recintoRepo.findOne({
      where: { id: id_recinto },
      relations: ['secciones']
    });

    if (new Date(fecha) < ahora) {
      throw new BadRequestException("No se puede crear un concierto con fecha anterior a hoy");
    }

    if (fecha_venta && new Date(fecha_venta) < ahora) {
      throw new BadRequestException("La fecha de venta no puede ser anterior a hoy");
    }

    if (!recinto) throw new NotFoundException(`Recinto ${id_recinto} no encontrado`);
    if (!recinto.secciones || recinto.secciones.length === 0)
      throw new BadRequestException(`No se puede crear un concierto: el recinto no tiene secciones disponibles`);

    // 2️⃣ Filtrar solo secciones con capacidad > 0
    const seccionesDisponibles = recinto.secciones.filter(s => s.capacidad > 0);
    if (seccionesDisponibles.length === 0)
      throw new BadRequestException(`No se puede crear un concierto: el recinto no tiene secciones con capacidad disponible`);

    // 2️⃣ Determinar estado inicial según fecha_venta
    let estadoInicial: EstadoConcierto;
    if (!fecha_venta || new Date(fecha_venta) <= ahora) {
      estadoInicial = EstadoConcierto.ACTIVO;
    } else {
      estadoInicial = EstadoConcierto.PROXIMAMENTE;
    }

    // 3️⃣ Crear concierto sin precios aún
    const concierto = this.conciertoRepository.create({
      fecha: new Date(fecha),
      fecha_venta: fecha_venta ? new Date(fecha_venta) : null,
      id_artista,
      id_recinto,
      estado: estadoInicial
    });

    // Guardar primero para obtener ID
    await this.conciertoRepository.save(concierto);

    // 3️⃣ Buscar artista para usar en Stripe
    const artista = await this.artistaRepo.findOne({ where: { id: id_artista } });
    if (!artista) throw new NotFoundException(`Artista ${id_artista} no encontrado`);

    // 4️⃣ Crear precios por sección y guardarlos en Stripe y en DB
    for (const p of preciosPorSeccion) {
      if (!p.precio || p.precio <= 0) continue;

      const seccion = seccionesDisponibles.find(s => s.id === p.id_seccion);
      if (!seccion) continue;

      // Crear precio en Stripe con nombre más descriptivo
      const stripePrice = await this.stripe.prices.create({
        unit_amount: p.precio * 100, // en centavos
        currency: 'eur',
        product_data: {
          name: `Entrada ${seccion.nombre} - Concierto ${artista.nombre} - ${new Date(fecha).toISOString().split('T')[0]}`
        }
      });

      // Guardar precio en DB
      const precioEntity = this.preciosRepo.create({
        seccion,
        concierto,
        precio: p.precio,
        id_precio_stripe: stripePrice.id,
        capacidad_disponible: seccion.capacidad,
      });

      await this.preciosRepo.save(precioEntity);
    }

    return concierto;
  }

  async findAll(estado?: EstadoConcierto, filtroGenero?: string, fechaInicio?: string) {
    const ahora = new Date();

    // 1️⃣ Proximamente → Activo
    await this.conciertoRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoConcierto.ACTIVO })
      .where('estado = :estado', { estado: EstadoConcierto.PROXIMAMENTE })
      .andWhere('(fecha_venta <= :ahora OR fecha_venta IS NULL)', { ahora })
      .execute();

    // 2️⃣ Activo → Finalizado
    await this.conciertoRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoConcierto.FINALIZADO })
      .where('estado = :estado', { estado: EstadoConcierto.ACTIVO })
      .andWhere('fecha < :ahora', { ahora })
      .execute();

    // 3️⃣ Consulta principal, excluyendo finalizados
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
        'concierto.estado',
        'concierto.fecha_venta',
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
      .where('concierto.estado = :estado', { estado })
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
      const precioObj = precios.find(p => p.seccion.id === seccion.id) ;
      return {
        ...seccion,
        precio: precioObj?.precio ?? null,
        capacidad_disponible: precioObj?.capacidad_disponible ?? 0,
        id_precio: precioObj?.id ?? null,
        id_precio_stripe: precioObj?.id_precio_stripe ?? null
      };
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
    const ahora = new Date();
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: ['preciosPorSeccion', 'preciosPorSeccion.seccion', 'artista', 'recinto']
    });

    if (!concierto) throw new NotFoundException('Concierto no encontrado');

    // Actualizar campos básicos
    if (dto.fecha) concierto.fecha = new Date(dto.fecha);
    if (dto.id_artista) concierto.id_artista = dto.id_artista;
    if (dto.id_recinto) concierto.id_recinto = dto.id_recinto;

    if (dto.fecha_venta !== undefined) {
      concierto.fecha_venta = dto.fecha_venta ? new Date(dto.fecha_venta) : null;

      const ahora = new Date();
      if (!concierto.fecha_venta || concierto.fecha_venta <= ahora) {
        concierto.estado = EstadoConcierto.ACTIVO;
      } else {
        concierto.estado = EstadoConcierto.PROXIMAMENTE;
      }
    }

    if (concierto.fecha < ahora) {
      concierto.estado = EstadoConcierto.FINALIZADO;
    }

    if (dto.preciosPorSeccion) {
      for (const p of dto.preciosPorSeccion) {
        if (!p.precio || p.precio <= 0) continue; // evita precios 0

        const seccion = await this.seccionRepo.findOne({ where: { id: p.id_seccion } });
        if (!seccion) throw new NotFoundException(`Sección ${p.id_seccion} no encontrada`);
        if (seccion.capacidad <= 0) continue;

        if (p.id) {
          const precioExistente = concierto.preciosPorSeccion.find(pr => pr.id === p.id);

          if (precioExistente) {
            // Crear nuevo Price en Stripe si no existe o si el precio cambió
            if (!precioExistente.id_precio_stripe || precioExistente.precio !== p.precio) {
              const fechaObj = concierto.fecha instanceof Date ? concierto.fecha : new Date(concierto.fecha);
              const stripePrice = await this.stripe.prices.create({
                unit_amount: p.precio * 100,
                currency: 'eur',
                product_data: {
                  name: `Entrada ${seccion.nombre} - Concierto ${concierto.artista.nombre} - ${fechaObj.toISOString().split('T')[0]}`
                }
              });

              precioExistente.precio = p.precio;
              precioExistente.id_precio_stripe = stripePrice.id;
            }
          }
        } else {
          // Precio nuevo
          const fechaObj = concierto.fecha instanceof Date ? concierto.fecha : new Date(concierto.fecha);
          const stripePrice = await this.stripe.prices.create({
            unit_amount: p.precio * 100,
            currency: 'eur',
            product_data: {
              name: `Entrada ${seccion.nombre} - Concierto ${fechaObj.toISOString().split('T')[0]}`
            }
          });

          const nuevoPrecio = this.preciosRepo.create({
            concierto,
            seccion,
            precio: p.precio,
            id_precio_stripe: stripePrice.id,
            capacidad_disponible: seccion.capacidad,
          });

          concierto.preciosPorSeccion.push(nuevoPrecio);
        }
      }
    }

    return await this.conciertoRepository.save(concierto);
  }

  remove(id: number) {
    return `This action removes a #${id} concierto`;
  }
}
