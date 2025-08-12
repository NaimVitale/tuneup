import { Module } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artistas.controller';

@Module({
  controllers: [ArtistasController],
  providers: [ArtistasService],
})
export class ArtistasModule {}
