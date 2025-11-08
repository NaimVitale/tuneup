import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class SeccionCreateDto {
  @IsString()
  nombre: string;

  @IsNumber()
  capacidad: number;

  @IsString()
  tipo_svg: string;

  @IsString()
  svg_path: string;
}

export class CreateRecintoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  ciudad: number;

  @IsOptional()
  @IsString()
  svg_map?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeccionCreateDto)
  secciones?: SeccionCreateDto[];
}
