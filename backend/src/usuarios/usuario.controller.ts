import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe, Request, ForbiddenException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { JwtRolesGuard } from 'src/auth/jwt-roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  /*@Get()
  findAll() {
    return this.usuarioService.findAll();
  }*/

  @UseGuards(JwtRolesGuard)
  @Get(':id')
  @Roles('admin', 'usuario')
  async getPerfil(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userAuth = req.user;
    
    if (userAuth.sub !== id) {
      throw new ForbiddenException('No tienes permiso para acceder a este perfil');
    }

    const usuario = await this.usuarioService.findById(id);

    return usuario;
  }

  /*@Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usuarioService.update(id, updateUserDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}