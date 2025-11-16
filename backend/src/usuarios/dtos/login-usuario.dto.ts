import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Debes ingresar tu contraseña' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}