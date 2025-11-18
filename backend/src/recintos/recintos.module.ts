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
import { UploadModule } from 'src/upload/upload.module';
import { PreciosSeccionConcierto } from 'src/precios-seccion-concierto/entities/precios-seccion-concierto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto, Seccion, Concierto, PreciosSeccionConcierto]), AuthModule, UploadModule],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [RecintosService],
})
export class RecintosModule {}
