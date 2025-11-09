import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ConciertosService } from './conciertos.service';
import { CreateConciertoDto } from './dto/create-concierto.dto';
import { UpdateConciertoDto } from './dto/update-concierto.dto';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('conciertos')
export class ConciertosController {
  constructor(private readonly conciertosService: ConciertosService) {}

  @UseGuards(JwtRolesGuard)
  @Post()
  @Roles('admin')
  create(@Body() createConciertoDto: CreateConciertoDto) {
    return this.conciertosService.create(createConciertoDto);
  }

  @Get('public')
  findAll(
  @Query('genero') genero?: string,
  @Query('fechaInicio') fechaInicio?: string,
  ) {
    return this.conciertosService.findAll(genero, fechaInicio);
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.conciertosService.findOnePublic(+id);
  }

  @UseGuards(JwtRolesGuard)
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.conciertosService.findOne(+id);
  }

  @UseGuards(JwtRolesGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateConciertoDto: UpdateConciertoDto) {
    return this.conciertosService.update(+id, updateConciertoDto);
  }
  
  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conciertosService.remove(+id);
  }*/
}
