import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class SeccionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  nombre: string;

  @IsNumber()
  capacidad: number;

  @IsString()
  tipo_svg: string;

  @IsString()
  svg_path: string;
}

export class UpdateRecintoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  ciudad?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeccionDto)
  secciones?: SeccionDto[];
}
