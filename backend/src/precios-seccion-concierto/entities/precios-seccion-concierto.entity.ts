import { Concierto } from 'src/conciertos/entities/concierto.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('precios_seccion_concierto')
export class PreciosSeccionConcierto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  capacidad_disponible: number;

  @ManyToOne(() => Concierto, concierto => concierto.preciosPorSeccion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_concierto' })
  concierto: Concierto;

  @ManyToOne(() => Seccion, seccion => seccion.conciertosConPrecio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_seccion' })
  seccion: Seccion;
}