import { Injectable } from '@nestjs/common';
import { ArtistaService } from '../artistas/artista.service';
import { RecintosService } from '../recintos/recintos.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly artistasService: ArtistaService,
    private readonly recintosService: RecintosService,
  ) {}

  async globalSearch(query: string) {
    if (!query) return { artistas: [], recintos: [] };

    const [artistas, recintos] = await Promise.all([
      this.artistasService.searchByName(query),
      this.recintosService.searchByName(query),
    ]);

    return {
      artistas: artistas.slice(0, 3),
      recintos: recintos.slice(0, 3),
    };
  }
}
