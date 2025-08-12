import { Injectable } from '@nestjs/common';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';

@Injectable()
export class ConciertosService {
  create(createConciertoDto: CreateConciertoDto) {
    return 'This action adds a new concierto';
  }

  findAll() {
    return `This action returns all conciertos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concierto`;
  }

  update(id: number, updateConciertoDto: UpdateConciertoDto) {
    return `This action updates a #${id} concierto`;
  }

  remove(id: number) {
    return `This action removes a #${id} concierto`;
  }
}
