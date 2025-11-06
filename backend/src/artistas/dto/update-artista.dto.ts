import { CreateArtistaDto } from './create-artista.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArtistaDto {

          @IsOptional()
          @IsNotEmpty()
          nombre: string;
    
          @IsOptional()
          @IsNotEmpty()
          descripcion: string;

        
          @IsOptional()
          @IsNotEmpty()
          img_card : string;
    
          @IsOptional()
          img_hero : string;
    
          @IsOptional()
          images : string;

          @IsOptional()
          genero : number;
}

export const ALLOWED_FILE_FIELDS = ['img_card', 'img_hero', 'images'];
