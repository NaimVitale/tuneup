import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('No se encontró token');

    const token = authHeader.split(' ')[1];
    const payload = this.jwtService.verify(token);

    request.user = payload;

    if (!roles) return true;
    if (!roles.includes(payload.rol)) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    return true;
  }
}