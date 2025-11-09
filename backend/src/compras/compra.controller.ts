// src/compras/compra.controller.ts
import { Controller, Get, Param, UseGuards, Req, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CompraService } from './compra.service';
import { Request } from 'express';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';

@Controller('compras')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @UseGuards(JwtRolesGuard)
  @Get(':checkoutSessionId')
  async getByCheckoutSessionId(@Param('checkoutSessionId') checkoutSessionId: string, @Req() req: Request) {
    const usuarioId = (req as any).user.id;

    const compra = await this.compraService.findByCheckoutSessionId(checkoutSessionId);

    if (!compra) throw new NotFoundException('Compra no encontrada');

    // Verificar que el usuario sea dueño de la compra
    if (compra.id_usuario !== usuarioId) {
      throw new ForbiddenException('No tienes permiso para ver esta compra');
    }

    return compra;
  }
}
