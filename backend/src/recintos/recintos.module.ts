import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto, Seccion])],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [TypeOrmModule],
})
export class RecintosModule {}
