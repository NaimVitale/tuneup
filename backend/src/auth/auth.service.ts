import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from '../usuarios/dtos/login-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUsuarioDto) {
    const usuario = await this.usuarioService.findByEmail(dto.email.toLocaleLowerCase());

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordMatch = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: usuario.id, rol: usuario.rol };
    const token = this.jwtService.sign(payload);

    return { token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol, fecha: usuario.createdAt} };
  }
}