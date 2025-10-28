import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConciertosModule } from './conciertos/conciertos.module';
import { ArtistaModule } from './artistas/artista.module';
import { RecintosModule } from './recintos/recintos.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SearchModule } from './search/search.module';
import { PreciosSeccionConciertoModule } from './precios-seccion-concierto/precios-seccion-concierto.module';

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
        synchronize:false,
        logging: true, // <== así ves en consola las consultas y conexión
      }),
    }),
    ConciertosModule,
    ArtistaModule,
    RecintosModule,
    UsuarioModule,
    AuthModule,
    UploadModule,
    CloudinaryModule,
    SearchModule,
    PreciosSeccionConciertoModule
  ],
})
export class AppModule {}