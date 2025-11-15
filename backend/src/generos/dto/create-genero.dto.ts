import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGeneroDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  descripcion: string;
}