import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CiudadesService } from './ciudad.service';

@Controller('ciudades')
export class CiudadesController {

  constructor(private readonly ciudadesService: CiudadesService) {}

  @Get()
  findAll() {
    return this.ciudadesService.findAll();
  }

  @Get('public')
  findAllPublic() {
    return this.ciudadesService.findAllPublic();
  }

  @Post()
  create(@Body('nombre') nombre: string) {
    return this.ciudadesService.create(nombre);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadesService.remove(+id);
  }
}