import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConciertosService } from './conciertos.service';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';

@Controller('conciertos')
export class ConciertosController {
  constructor(private readonly conciertosService: ConciertosService) {}

  /*@Post()
  create(@Body() createConciertoDto: CreateConciertoDto) {
    return this.conciertosService.create(createConciertoDto);
  }*/

  @Get()
  findAll() {
    return this.conciertosService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.conciertosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConciertoDto: UpdateConciertoDto) {
    return this.conciertosService.update(+id, updateConciertoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conciertosService.remove(+id);
  }*/
}
