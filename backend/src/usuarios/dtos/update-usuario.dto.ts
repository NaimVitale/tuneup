import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUsuarioDto {
  @IsOptional()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}