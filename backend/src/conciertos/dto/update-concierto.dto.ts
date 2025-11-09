import { IsOptional, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePrecioSeccionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  id_seccion?: number;

  @IsNumber()
  precio: number;
}

export class UpdateConciertoDto {
  @IsOptional()
  @IsNumber()
  id_artista?: number;

  @IsOptional()
  @IsNumber()
  id_recinto?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePrecioSeccionDto)
  preciosPorSeccion?: UpdatePrecioSeccionDto[];

  @IsOptional()
  secciones?: any[];
}