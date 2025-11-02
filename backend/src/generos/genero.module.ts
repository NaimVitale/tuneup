import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Genero])],
  controllers: [GeneroController],
  providers: [GeneroService],
  exports: [GeneroService],
})
export class GeneroModule {}
