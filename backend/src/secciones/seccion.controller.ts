import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { SeccionesService } from './seccion.service';
import { Seccion } from './entities/seccion.entity';

@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionesService: SeccionesService) {}

  @Get()
  async getSecciones(@Query('recinto') recintoId: number, @Query('concierto') conciertoId?: number) {
    return this.seccionesService.findByRecintoWithPrecios(+recintoId, conciertoId ? +conciertoId : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seccionesService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Seccion>) {
    return this.seccionesService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Seccion>) {
    return this.seccionesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seccionesService.remove(id);
  }
}
