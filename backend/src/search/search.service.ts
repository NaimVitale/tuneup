import { Injectable } from '@nestjs/common';
import { ArtistaService } from '../artistas/artista.service';
//import { RecintosService } from '../recintos/recintos.service';
//import { FestivalesService } from '../festivales/festivales.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly artistasService: ArtistaService,
    //private readonly recintosService: RecintosService,
    //private readonly festivalesService: FestivalesService,
  ) {}

  async globalSearch(query: string) {
    const [artistas] = await Promise.all([
      this.artistasService.searchByName(query),
      //this.recintosService.searchByName(query),
      //this.festivalesService.searchByName(query),
    ]);

    return {
      artistas,
    };
  }
}
