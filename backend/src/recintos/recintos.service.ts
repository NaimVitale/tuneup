import { Injectable } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { Recinto } from './entities/recinto.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecintosService {
  constructor(@InjectRepository(Recinto) private repo: Repository<Recinto>) {}

  create(createRecintoDto: CreateRecintoDto) {
    return 'This action adds a new recinto';
  }

  findAll() {
    return this.repo
      .createQueryBuilder('recinto')
      .leftJoinAndSelect('recinto.ciudad', 'ciudad')
      .loadRelationCountAndMap('recinto.seccionesCount', 'recinto.secciones')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} recinto`;
  }

  async searchByName(query: string) {
    return this.repo.find({
      where: {
        nombre: ILike(`%${query}%`),
      },
    });
  }

  update(id: number, updateRecintoDto: UpdateRecintoDto) {
    return `This action updates a #${id} recinto`;
  }

  remove(id: number) {
    return `This action removes a #${id} recinto`;
  }
}
