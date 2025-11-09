import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreciosSeccionConcierto } from './entities/precios-seccion-concierto.entity';
import { PreciosSeccionConciertoService } from './precios-seccion-concierto.service';

@Module({
  imports: [TypeOrmModule.forFeature([PreciosSeccionConcierto])],
  controllers: [/*PreciosSeccionConciertoController*/],
  providers: [PreciosSeccionConciertoService],
  exports: [PreciosSeccionConciertoService, TypeOrmModule],
})
export class PreciosSeccionConciertoModule {}