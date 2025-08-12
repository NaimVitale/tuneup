import { Injectable } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Injectable()
export class ArtistasService {
  create(createArtistaDto: CreateArtistaDto) {
    return 'This action adds a new artista';
  }

  findAll() {
    return `This action returns all artistas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artista`;
  }

  update(id: number, updateArtistaDto: UpdateArtistaDto) {
    return `This action updates a #${id} artista`;
  }

  remove(id: number) {
    return `This action removes a #${id} artista`;
  }
}
