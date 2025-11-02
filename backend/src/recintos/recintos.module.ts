import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { ArtistaService } from 'src/artistas/artista.service';
import { SearchService } from 'src/search/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto, Seccion])],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [RecintosService],
})
export class RecintosModule {}
