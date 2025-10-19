import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ArtistaModule } from '../artistas/artista.module';
import { RecintosModule } from '../recintos/recintos.module';
import { ConciertosModule } from '../conciertos/conciertos.module';
//import { FestivalesModule } from '../festivales/festivales.module';

@Module({
  imports: [
    ArtistaModule,
    RecintosModule,
    ConciertosModule,
    //FestivalesModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}