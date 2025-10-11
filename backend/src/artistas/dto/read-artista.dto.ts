import { Artista } from "../entities/artista.entity";

export class ReadArtistaDto {
  constructor(
    public id: number,
    public nombre: string,
    public slug: string,
    public descripcion: string,
    public img_card: string,
    public img_hero: string,
    public images: string
  ) {}

  static fromModel(artista: Artista): ReadArtistaDto {
    return new ReadArtistaDto(
      artista.id,
      artista.nombre,
      artista.slug,
      artista.descripcion,
      artista.img_card,
      artista.img_hero,
      artista.images
    );
  }
}