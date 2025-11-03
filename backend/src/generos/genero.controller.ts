import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GeneroService } from './genero.service';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('generos')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Get('public')
  findAllPublic() {
    return this.generoService.findAllPublic();
  }

  @UseGuards(JwtRolesGuard)
  @Get()
  @Roles('admin')
  findAll() {
    return this.generoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.generoService.findOne(id);
  }

  @Post()
  create(@Body() body: { nombre: string; descripcion: string }) {
    return this.generoService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{ nombre: string; descripcion: string }>,
  ) {
    return this.generoService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.generoService.remove(id);
  }
}
