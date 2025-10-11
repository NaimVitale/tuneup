import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Artista]), AuthModule],
  controllers: [ArtistaController],
  providers: [ArtistaService],
})
export class ArtistaModule {}
