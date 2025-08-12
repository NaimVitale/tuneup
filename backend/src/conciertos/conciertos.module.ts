import { Module } from '@nestjs/common';
import { ConciertosService } from './conciertos.service';
import { ConciertosController } from './conciertos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concierto } from './entities/concierto.entity';
import { Recinto } from 'src/recintos/entities/recinto.entity';
import { Artista } from 'src/artistas/entities/artista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concierto, Artista, Recinto]),],
  controllers: [ConciertosController],
  providers: [ConciertosService],
})
export class ConciertosModule {}
