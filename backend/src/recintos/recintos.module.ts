import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { ArtistaService } from 'src/artistas/artista.service';
import { SearchService } from 'src/search/search.service';
import { AuthModule } from 'src/auth/auth.module';
import { Concierto } from 'src/conciertos/entities/concierto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto, Seccion, Concierto]), AuthModule],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [RecintosService],
})
export class RecintosModule {}
