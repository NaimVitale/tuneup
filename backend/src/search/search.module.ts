import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ArtistaModule } from '../artistas/artista.module';
import { ConciertosModule } from '../conciertos/conciertos.module';
import { RecintosModule } from 'src/recintos/recintos.module';

@Module({
  imports: [
    ArtistaModule,
    RecintosModule,
    ConciertosModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}