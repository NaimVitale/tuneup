import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports:[TypeOrmModule.forFeature([Artista]), AuthModule, UploadModule],
  controllers: [ArtistaController],
  providers: [ArtistaService],
  exports: [ArtistaService]
})
export class ArtistaModule {}
