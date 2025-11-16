import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { capitalizeWords } from 'src/common/utils/capitalize';

export class CreateUsuarioDto {
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
}