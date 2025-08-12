import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConciertosModule } from './conciertos/conciertos.module';
import { Concierto } from './conciertos/entities/concierto.entity';
import { ArtistasModule } from './artistas/artistas.module';
import { Artista } from './artistas/entities/artista.entity';
import { RecintosModule } from './recintos/recintos.module';
import { Recinto } from './recintos/entities/recinto.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        logging: true, // <== así ves en consola las consultas y conexión
      }),
    }),
    ConciertosModule,
    ArtistasModule,
    RecintosModule,
  ],
})
export class AppModule {}