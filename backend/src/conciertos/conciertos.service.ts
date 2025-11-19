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
import { Entrada } from 'src/entradas/entities/entrada.entity';

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

    @InjectRepository(Entrada)
    private entradaRepo: Repository<Entrada>,

    private readonly preciosService: PreciosSeccionConciertoService,
  )  {
    const secretKey = this.configService.get<string>('stripe.secretKey');
    if (!secretKey) throw new Error('Stripe secret key not defined');

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-10-29.clover',
    });
  }

  async actualizarEstados(fechaReferencia: Date = new Date()) {
    // 1️⃣ Proximamente → Activo
    await this.conciertoRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoConcierto.ACTIVO })
      .where('estado = :proximamente', { proximamente: EstadoConcierto.PROXIMAMENTE })
      .andWhere('(fecha_venta <= :ahora OR fecha_venta IS NULL)', { ahora: fechaReferencia })
      .execute();

    // 2️⃣ Activo → Finalizado
    await this.conciertoRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoConcierto.FINALIZADO })
      .where('estado = :activo', { activo: EstadoConcierto.ACTIVO })
      .andWhere('fecha < :ahora', { ahora: fechaReferencia })
      .execute();
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

  async findAllAdmin(incluirEliminados = false) {
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
        'concierto.deleted_at',
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
      .addGroupBy('recinto.ciudad')
      .addGroupBy('genero.id')
      .orderBy('concierto.fecha', 'ASC');

    if (incluirEliminados) {
      query.withDeleted();
    }

    // Ejecutamos la query
    const { entities, raw } = await query.getRawAndEntities();

    // Mapear precio_minimo de raw a cada entidad
    const data = entities.map((concierto, i) => ({
      ...concierto,
      precio_minimo: raw[i]['precio_minimo'] ?? null,
    }));

    return data;
  }

  async findAll(
    estado?: EstadoConcierto,
    filtroGenero?: string,
    fechaInicio?: string,
    page = 1,
    limit = 10,
  ) {
    let estadoParam: EstadoConcierto | undefined;
    if (estado === EstadoConcierto.ACTIVO || estado === EstadoConcierto.PROXIMAMENTE) {
      estadoParam = estado;
    }

    const ahora = new Date();
    await this.actualizarEstados(ahora);

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
      .where('concierto.deleted_at IS NULL')
      .andWhere('artista.deleted_at IS NULL')
      .andWhere('recinto.deleted_at IS NULL')
      .groupBy('concierto.id')
      .addGroupBy('artista.id')
      .addGroupBy('recinto.id')
      .addGroupBy('recinto.ciudad')
      .addGroupBy('genero.id')
      .orderBy('concierto.fecha', 'ASC');

    if (estadoParam) {
      query.andWhere('concierto.estado = :estado', { estado: estadoParam });
    }

    if (filtroGenero) {
      query.andWhere('LOWER(genero.nombre) = LOWER(:nombre)', { nombre: filtroGenero });
    }

    if (fechaInicio) {
      query.andWhere('concierto.fecha >= :inicio', { inicio: fechaInicio });
    }

    // Paginación
    query.skip((page - 1) * limit).take(limit);

    // Ejecutar query: getRawAndEntities devuelve raw SQL + entidades mapeadas
    const { entities, raw } = await query.getRawAndEntities();

    // Mapear precio_minimo de raw a cada entidad
    const data = entities.map((concierto, i) => ({
      ...concierto,
      precio_minimo: raw[i]['precio_minimo'] ?? null,
    }));

    // Contar total sin paginación para meta
    const total = await query.getCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findTopActivos() {
    const ahora = new Date();

    // Asegurarse de que los estados estén actualizados
    await this.actualizarEstados(ahora);

    // Consulta: 5 conciertos activos con más entradas + precio mínimo
    return this.conciertoRepository
      .createQueryBuilder('concierto')
      .leftJoinAndSelect('concierto.artista', 'artista')
      .leftJoinAndSelect('concierto.recinto', 'recinto')
      .leftJoinAndSelect('recinto.ciudad', 'ciudad')
      .leftJoin('concierto.entradas', 'entrada')
      .leftJoin('concierto.preciosPorSeccion', 'psc')
      .addSelect('COUNT(entrada.id)', 'entradas_totales')
      .addSelect('MIN(psc.precio)', 'precio_minimo')
      .where('concierto.deleted_at IS NULL')
      .andWhere('artista.deleted_at IS NULL')
      .andWhere('recinto.deleted_at IS NULL')
      .where('concierto.estado = :activo', { activo: EstadoConcierto.ACTIVO })
      .groupBy('concierto.id')
      .addGroupBy('artista.id')
      .addGroupBy('recinto.id')
      .addGroupBy('ciudad.id')
      .orderBy('entradas_totales', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async findTopProximamente() {
    const ahora = new Date();

    // Actualizar estados
    await this.actualizarEstados(ahora);

    // Consulta completa con joins y precio mínimo
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
      .where('concierto.deleted_at IS NULL')
      .andWhere('artista.deleted_at IS NULL')
      .andWhere('recinto.deleted_at IS NULL')
      .where('concierto.estado = :proximamente', { proximamente: EstadoConcierto.PROXIMAMENTE })
      .groupBy('concierto.id')
      .addGroupBy('artista.id')
      .addGroupBy('recinto.id')
      .addGroupBy('ciudad.id')
      .addGroupBy('genero.id')
      .orderBy('concierto.fecha', 'DESC')
      .limit(5)
      .cache(true);

    return query.getRawMany();
  }



  async findOnePublic(id: number, slug: string) {
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

    if (!concierto || concierto.artista.slug !== slug) {
      throw new NotFoundException("Concierto no disponible");
    }

    // Validar si el concierto está finalizado
    const ahora = new Date();
    const fechaConcierto = new Date(concierto.fecha); // asegúrate que concierto.fecha está incluida en el entity

    if (fechaConcierto < ahora) {
      // también puedes usar GoneException
      throw new NotFoundException("Concierto no disponible");
    }


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
        capacidad_disponible: precioObj?.capacidad_disponible ?? seccion.capacidad,
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

          if (precioExistente?.precio !== p.precio) {
            const entradasVendidas = await this.entradaRepo.count({
              where: {
                id_concierto: concierto.id,
                id_seccion: p.id_seccion,
                estado_entrada: 'activa'
              }
            });

            if (entradasVendidas > 0) {
              throw new BadRequestException(
                `No se puede modificar el precio de la sección ${seccion.nombre} porque ya hay ${entradasVendidas} entradas vendidas en esa sección.`
              );
            }
          }

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

  async softDelete(id: number) {
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: ['artista', 'recinto'],
    });

    if (!concierto) throw new NotFoundException('Concierto no encontrado');

    await this.conciertoRepository.softDelete(id);

    return {
      message: 'Concierto eliminado correctamente',
      id,
    };
  }

  async restore(id: number) {
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: ['artista', 'recinto'],
      withDeleted: true,
    });

    if (!concierto) throw new NotFoundException('Concierto no encontrado');

    const warnings: string[] = [];

    if (concierto.artista.deleted_at) {
      await this.conciertoRepository.manager.restore(Artista, { id: concierto.artista.id });
      warnings.push('Se restauró el artista automáticamente');
    }

    if (concierto.recinto.deleted_at) {
      await this.conciertoRepository.manager.restore(Recinto, { id: concierto.recinto.id });
      warnings.push('Se restauró el recinto automáticamente');
    }

    await this.conciertoRepository.restore(id);

    return { message: 'Concierto restaurado correctamente', id, warnings };
  }

  async getRestoreWarnings(id: number) {
    const concierto = await this.conciertoRepository.findOne({
      where: { id },
      relations: ['artista', 'recinto'],
      withDeleted: true,
    });

    if (!concierto) throw new NotFoundException('Concierto no encontrado');

    return {
      artistaEliminado: !!concierto.artista.deleted_at,
      recintoEliminado: !!concierto.recinto.deleted_at,
    };
  }
}
