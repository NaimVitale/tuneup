import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateArtistaDto {
      @IsNotEmpty()
      nombre: string;
    
      @IsNotEmpty()
      descripcion: string;
    
      @IsNotEmpty()
      img_card : string;

      @IsOptional()
      img_hero : string;

      @IsOptional()
      images : string;
}
