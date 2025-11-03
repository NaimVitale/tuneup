import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';

@Controller('recintos')
export class RecintosController {
  constructor(private readonly recintosService: RecintosService) {}

  @Post()
  create(@Body() createRecintoDto: CreateRecintoDto) {
    return this.recintosService.create(createRecintoDto);
  }

  @UseGuards(JwtRolesGuard)
  @Get()
  @Roles('admin')
  findAll() {
    return this.recintosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recintosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecintoDto: UpdateRecintoDto) {
    return this.recintosService.update(+id, updateRecintoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recintosService.remove(+id);
  }
}
