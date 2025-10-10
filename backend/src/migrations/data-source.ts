import { Artista } from 'src/artistas/entities/artista.entity';
import { Concierto } from 'src/conciertos/entities/concierto.entity';
import { Recinto } from 'src/recintos/entities/recinto.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Artista, Concierto, Recinto, Usuario],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});