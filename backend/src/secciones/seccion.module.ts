import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeccionesService } from './seccion.service';
import { SeccionesController } from './seccion.controller';
import { Seccion } from './entities/seccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seccion])],
  controllers: [SeccionesController],
  providers: [SeccionesService],
  exports: [SeccionesService], // útil para otros módulos
})
export class SeccionesModule {}
