export class UsuarioReadDto {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  createdAt: Date;
}