import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaService } from './entrada.service';
import { Entrada } from './entities/entrada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrada])],
  providers: [EntradaService],
  exports: [EntradaService],
})
export class EntradaModule {}
