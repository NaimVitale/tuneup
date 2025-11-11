import { IsNotEmpty, IsNumber, IsDateString, IsArray, ValidateNested, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class PrecioSeccionDto {
  @IsNumber()
  @IsNotEmpty()
  id_seccion: number;

  @IsNumber()
  @Min(0)
  precio: number;
}

export class CreateConciertoDto {
  @IsDateString()
  fecha: string;

  @IsDateString()
  @IsOptional()
  fecha_venta?: string;

  @IsNumber()
  @IsNotEmpty()
  id_artista: number;

  @IsNumber()
  @IsNotEmpty()
  id_recinto: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrecioSeccionDto)
  preciosPorSeccion: PrecioSeccionDto[];
}