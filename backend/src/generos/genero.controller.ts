import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { GeneroService } from './genero.service';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

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

  @UseGuards(JwtRolesGuard)
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.generoService.findOne(id);
  }

  // Create
  @UseGuards(JwtRolesGuard)
  @Post()
  @Roles('admin')
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generoService.create(createGeneroDto);
  }

  // Update
  @UseGuards(JwtRolesGuard)
  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeneroDto: UpdateGeneroDto,
  ) {
    return this.generoService.update(id, updateGeneroDto);
  }

  // Soft Delete
  @UseGuards(JwtRolesGuard)
  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.generoService.softDelete(id);
  }

  // Restore
  @UseGuards(JwtRolesGuard)
  @Post('restore/:id')
  @Roles('admin')
  restore(@Param('id') id: number) {
    return this.generoService.restore(id);
  }

}
