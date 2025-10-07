import { IsNotEmpty, MinLength } from "class-validator";

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'Debes ingresar tu contraseña actual.' })
  oldPassword: string;

  @IsNotEmpty({ message: 'Debes ingresar una nueva contraseña.' })
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres.' })
  newPassword: string;
}