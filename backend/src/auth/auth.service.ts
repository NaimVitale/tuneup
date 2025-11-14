import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from '../usuarios/dtos/login-usuario.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUsuarioDto, res: Response) {
    const usuario = await this.usuarioService.findByEmail(dto.email.toLowerCase());

    if (!usuario) throw new UnauthorizedException('Credenciales incorrectas');

    const passwordMatch = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordMatch) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: usuario.id, rol: usuario.rol };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '1d' });

    // Guardar refresh token en cookie HttpOnly
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true, // true en producción HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    return {
      access_token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        fecha: usuario.createdAt,
      },
    };
  }

  async refresh(req: any) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new UnauthorizedException('No hay refresh token');

    try {
      const payload = this.jwtService.verify(refreshToken);

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, rol: payload.rol },
        { expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (err) {
      // Si el token expiró o es inválido
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
