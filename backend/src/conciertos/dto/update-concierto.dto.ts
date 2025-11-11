import { IsOptional, IsNumber, IsDate, ValidateNested, IsDateString } from 'class-validator';
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

  @IsDateString()
  @IsOptional()
  fecha_venta?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePrecioSeccionDto)
  preciosPorSeccion?: UpdatePrecioSeccionDto[];

  @IsOptional()
  secciones?: any[];
}