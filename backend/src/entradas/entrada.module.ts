import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaService } from './entrada.service';
import { Entrada } from './entities/entrada.entity';
import { EntradaController } from './entrada.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entrada]), AuthModule],
  controllers: [EntradaController],
  providers: [EntradaService],
  exports: [EntradaService],
})
export class EntradaModule {}
