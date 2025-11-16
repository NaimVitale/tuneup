import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn, IsEnum } from 'class-validator';
import { RolUsuario } from '../usuario.entity';

export class CreateUsuarioAdminDto {
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  apellido?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(RolUsuario)
  rol: RolUsuario;
}