import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadesService {

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  findAllPublic() {
    return this.ciudadRepository.find({
      select:{
        id:true,
        nombre:true
      }
    });
  }

  findAll() {
    return this.ciudadRepository.find({
      relations: ['recintos']
    });
  }

  create(nombre: string) {
    const ciudad = this.ciudadRepository.create({ nombre });
    return this.ciudadRepository.save(ciudad);
  }

  async remove(id: number) {
    await this.ciudadRepository.delete(id);
  }
}