import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn, IsEnum } from 'class-validator';
import { RolUsuario } from '../usuario.entity';
import { Transform } from 'class-transformer';
import { capitalizeWords } from 'src/common/utils/capitalize';

export class CreateUsuarioAdminDto {
  @IsNotEmpty()
  @Transform(({ value }) => capitalizeWords(value))
  nombre: string;

  @IsOptional()
  @Transform(({ value }) => capitalizeWords(value))
  apellido?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(RolUsuario)
  rol: RolUsuario;
}