import { Module } from '@nestjs/common';
import { ConciertosService } from './conciertos.service';
import { ConciertosController } from './conciertos.controller';

@Module({
  controllers: [ConciertosController],
  providers: [ConciertosService],
})
export class ConciertosModule {}
