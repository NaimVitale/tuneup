import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  apellido?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}