import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
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
  @UseInterceptors(
  FileFieldsInterceptor(ALLOWED_FILE_FIELDS.map((name) => ({ name, maxCount: 1 })))
  ) 
  create(@Body() createArtistaDto: CreateArtistaDto, @UploadedFiles() files: Record<string, Express.Multer.File[]>) {
    return this.artistaService.create(createArtistaDto, files);
  }
  
  @Get('public')
  findAllPublic(@Query('genero') genero?: string,) {
    return this.artistaService.getAllPublic(genero);
  }

  @Get('nav-categories')
  getArtistNavbar() {
    return this.artistaService.getArtistNavbar();
  }

  @Get('select')
  findAllSelect() {
    return this.artistaService.getAllSelect();
  }

  @UseGuards(JwtRolesGuard)
  @Get()
  @Roles('admin')
  findAll(@Query('incluirEliminados') incluirEliminados?: string,) {
    const incluir = incluirEliminados === 'true';
    return this.artistaService.getAll(incluir);
  }

  @UseGuards(JwtRolesGuard)
  @Get(':slug')
  @Roles('admin')
  getArtistAdmin(@Param('slug') slug: string) {
    return this.artistaService.findBySlug(slug);
  }

  @Get('public/:slug')
  async getArtist(@Param('slug') slug: string) {
    const artista = await this.artistaService.findBySlugWithConciertos(slug);
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

  @UseGuards(JwtRolesGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.artistaService.remove(+id);
  }

  @UseGuards(JwtRolesGuard)
  @Patch('restore/:id')
  @Roles('admin')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.artistaService.restore(id);
  }
}
