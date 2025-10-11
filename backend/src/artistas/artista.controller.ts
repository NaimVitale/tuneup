import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';

@Controller('artistas')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @UseGuards(JwtRolesGuard)
  @Post()
  @Roles('admin')
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistaService.create(createArtistaDto);
  }

  @UseGuards(JwtRolesGuard)
  @Get()
  @Roles('admin')
  findAll() {
    return this.artistaService.getAll();
  }

  @Get(':slug')
  async getArtist(@Param('slug') slug: string) {
    const artista = await this.artistaService.findBySlug(slug);
    return artista;
  }

  @UseGuards(JwtRolesGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: UpdateArtistaDto) {
    return this.artistaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistaService.remove(+id);
  }
}
