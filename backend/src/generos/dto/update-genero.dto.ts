import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGeneroDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;
}