import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateArtistaDto {
      @IsNotEmpty()
      nombre: string;
    
      @IsNotEmpty()
      descripcion: string;

      @IsNotEmpty()
      @IsNumber()
      @Type(() => Number)
      genero: number;
}
