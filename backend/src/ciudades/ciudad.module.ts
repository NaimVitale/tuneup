import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadesController } from './ciudad.controller';
import { CiudadesService } from './ciudad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad])],
  controllers: [CiudadesController],
  providers: [CiudadesService],
  exports: [TypeOrmModule]
})
export class CiudadesModule {}