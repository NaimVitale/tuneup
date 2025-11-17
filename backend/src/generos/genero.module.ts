import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Artista } from 'src/artistas/entities/artista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genero, Artista]), AuthModule],
  controllers: [GeneroController],
  providers: [GeneroService],
  exports: [GeneroService],
})
export class GeneroModule {}
