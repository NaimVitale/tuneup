import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Artista } from 'src/artistas/entities/artista.entity';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,

    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
  ) {}

  findAllPublic() {
    return this.generoRepository.find({
      select: ['id', 'nombre'],
      where: { deleted_at: IsNull() },
    });
  }

  findAll(incluirEliminados = false) {
    return this.generoRepository.find({
      withDeleted: incluirEliminados,
    });
  }

  async getGenerosNavbar() {
    return this.artistaRepository
      .createQueryBuilder("artista")
      .innerJoin("artista.genero", "genero")  // ⬅️ evita género null
      .select("genero.nombre", "genero")
      .addSelect("COUNT(artista.id)", "cantidad")
      .where("artista.deleted_at IS NULL")
      .andWhere("genero.deleted_at IS NULL")
      .groupBy("genero.id")
      .addGroupBy("genero.nombre")
      .orderBy("cantidad", "DESC")
      .limit(4)
      .getRawMany();
  }
  
  findOne(id: number) {
    return this.generoRepository.findOne({ where: { id } });
  }

  // Crear género
  async create(createGeneroDto: CreateGeneroDto) {
    try {
      const genero = this.generoRepository.create(createGeneroDto);
      return await this.generoRepository.save(genero);

    } catch (error) {

      // Error MySQL: duplicate key
      if (error.code === "ER_DUP_ENTRY") {
        throw new BadRequestException({
          field: "nombre",
          message: `El género '${createGeneroDto.nombre}' ya existe`,
        });
      }

      throw error; // otros errores no controlados
    }
  }

  // Actualizar género
  async update(id: number, updateGeneroDto: UpdateGeneroDto) {
    const genero = await this.findOne(id);

    if (!genero) {
      throw new NotFoundException('Género no encontrado');
    }

    Object.assign(genero, updateGeneroDto);
    return this.generoRepository.save(genero);
  }

  // Soft delete
  async softDelete(id: number) {
    const genero = await this.findOne(id);

    if (!genero) {
      throw new NotFoundException('Género no encontrado');
    }

    genero.deleted_at = new Date();
    return this.generoRepository.save(genero);
  }

  // Restaurar soft delete (opcional)
  async restore(id: number) {
    const result = await this.generoRepository.restore(id);

    if (result.affected === 0) {
      throw new NotFoundException('Género no encontrado');
    }

    return this.generoRepository.findOne({ where: { id } });
  }
}