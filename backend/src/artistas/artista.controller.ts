import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { ALLOWED_FILE_FIELDS, UpdateArtistaDto } from './dto/update-artista.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  @Patch(':slug')
  @UseInterceptors(
  FileFieldsInterceptor(ALLOWED_FILE_FIELDS.map((name) => ({ name, maxCount: 1 }))))
  @Roles('admin')
  update(@Param('slug') slug: string, @Body() dto: UpdateArtistaDto, @UploadedFiles() files: Record<string, Express.Multer.File[]>) {
    return this.artistaService.update(slug, dto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistaService.remove(+id);
  }
}
