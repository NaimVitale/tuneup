import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  findAllPublic() {
    return this.generoRepository.find({
      select: ['id', 'nombre'],
    });
  }

  findAll() {
    return this.generoRepository.find()
  }
  
  findOne(id: number) {
    return this.generoRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Genero>) {
    const genero = this.generoRepository.create(data);
    return await this.generoRepository.save(genero);
  }

  async update(id: number, data: Partial<Genero>) {
    const genero = await this.findOne(id);
    if (!genero) throw new NotFoundException('Género no encontrado');

    Object.assign(genero, data);
    return this.generoRepository.save(genero);
  }

  async remove(id: number) {
    const genero = await this.findOne(id);
    if (!genero) throw new NotFoundException('Género no encontrado');

    return this.generoRepository.remove(genero);
  }
}