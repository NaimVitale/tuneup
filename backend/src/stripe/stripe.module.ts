import { forwardRef, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { CompraModule } from '../compras/compra.module';
import { EntradaModule } from '../entradas/entrada.module';
import { DataSource } from 'typeorm';
import { PreciosSeccionConciertoModule } from 'src/precios-seccion-concierto/precios-seccion-concierto.module';

@Module({
  imports: [forwardRef(() => CompraModule), EntradaModule, PreciosSeccionConciertoModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
