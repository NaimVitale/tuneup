import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  findAllPublic() {
    return this.generoRepository.find({
      select: ['id', 'nombre'],
      where: { deleted_at: IsNull() },
    });
  }

  findAll(incluirEliminados = false) {
    console.log(incluirEliminados)
    return this.generoRepository.find({
      withDeleted: incluirEliminados,
    });
  }
  
  findOne(id: number) {
    return this.generoRepository.findOne({ where: { id } });
  }

  // Crear género
  async create(createGeneroDto: CreateGeneroDto) {
    const genero = this.generoRepository.create(createGeneroDto);
    return this.generoRepository.save(genero);
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