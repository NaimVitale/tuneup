import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, BadRequestException, Query } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ALLOWED_FILE_FIELDS } from './entities/recinto.entity';

@Controller('recintos')
export class RecintosController {
  constructor(private readonly recintosService: RecintosService) {}

  @UseGuards(JwtRolesGuard)
  @Post()
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img_card', maxCount: 1 },
      { name: 'img_hero', maxCount: 1 },
    ])
  )
  create(
    @Body() body: any,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>
  ) {

    // Parsear secciones si vienen como string
    if (body.secciones && typeof body.secciones === "string") {
      try {
        body.secciones = JSON.parse(body.secciones);
      } catch (err) {
        console.error("Error parseando secciones:", err);
        throw new BadRequestException("Secciones inválidas");
      }
    }

    // Asegurar ciudad como número
    body.ciudad = Number(body.ciudad);

    return this.recintosService.create(body, files);
  }

  @UseGuards(JwtRolesGuard)
  @Get()
  @Roles('admin')
  findAll(@Query('incluirEliminados') incluirEliminados?: string,) {
    const incluir = incluirEliminados === 'true';
    return this.recintosService.findAll(incluir);
  }

  @Get('public')
  findAllPublic(@Query('ciudad') idCiudad?: string) {
    return this.recintosService.findAllPublic(idCiudad ? Number(idCiudad) : undefined);
  }

  @Get('select')
  findAllSelect() {
    return this.recintosService.findAllSelect();
  }

  @Get('nav-categories')
  getRecintosNavBar() {
    return this.recintosService.recintosNavbar();
  }

  @UseGuards(JwtRolesGuard)
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.recintosService.findOne(+id);
  }


  @Get('public/:id')
  GetOnePublic(@Param('id') id: number) {
    return this.recintosService.findOnePublic(id);
  }

  @UseGuards(JwtRolesGuard)
  @Patch(':id')
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img_card', maxCount: 1 },
      { name: 'img_hero', maxCount: 1 },
    ])
  )
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>
  ) {
    // Parsear secciones si vienen como string
    if (body.secciones && typeof body.secciones === "string") {
      try {
        body.secciones = JSON.parse(body.secciones);
      } catch (err) {
        console.error("Error parseando secciones:", err);
        throw new BadRequestException("Secciones inválidas");
      }
    }

    // Asegurar ciudad como número
    if (body.ciudad !== undefined) {
      body.ciudad = Number(body.ciudad);
    }

    return this.recintosService.update(Number(id), body, files);
  }

  @UseGuards(JwtRolesGuard)
  @Delete(':id')
  @Roles('admin')
  softDelete(@Param('id') id: string) {
    return this.recintosService.softDelete(+id);
  }

  @UseGuards(JwtRolesGuard)
  @Post('restore/:id')
  @Roles('admin')
  restore(@Param('id') id: string) {
    return this.recintosService.restore(+id);
  }
}
