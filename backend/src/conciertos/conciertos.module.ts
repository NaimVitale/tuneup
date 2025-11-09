import { Module } from '@nestjs/common';
import { ConciertosService } from './conciertos.service';
import { ConciertosController } from './conciertos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concierto } from './entities/concierto.entity';
import { Recinto } from 'src/recintos/entities/recinto.entity';
import { Artista } from 'src/artistas/entities/artista.entity';
import { PreciosSeccionConciertoModule } from 'src/precios-seccion-concierto/precios-seccion-concierto.module';
import { AuthModule } from 'src/auth/auth.module';
import { PreciosSeccionConciertoService } from 'src/precios-seccion-concierto/precios-seccion-concierto.service';
import { Seccion } from 'src/secciones/entities/seccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concierto, Artista, Recinto, Seccion]), PreciosSeccionConciertoModule, AuthModule],
  controllers: [ConciertosController],
  providers: [ConciertosService, PreciosSeccionConciertoService],
})
export class ConciertosModule {}
