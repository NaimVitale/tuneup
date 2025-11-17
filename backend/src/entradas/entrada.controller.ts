// src/entradas/entrada.controller.ts
import { Controller, Get, Post, Body, Param, Query, NotFoundException, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';

@Controller('entradas')
export class EntradaController {
  constructor(private readonly entradaService: EntradaService) {}

  // Listar todas las entradas o filtradas por id_usuario (via query)
  @UseGuards(JwtRolesGuard)
  @Get()
  async findAll(@Query('id_usuario') id_usuario?: number, @Query('limit') limit?: string, @Req() req?: any,) {
    if (id_usuario && req.user.id !== Number(id_usuario)) {
      throw new ForbiddenException('No tienes permiso para ver estas entradas');
    }
    return this.entradaService.findAllByUsuario(id_usuario, limit ? Number(limit) : undefined);
  }
}