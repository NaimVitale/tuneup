import { Compra } from 'src/compras/entities/compra.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Concierto } from 'src/conciertos/entities/concierto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('entradas')
export class Entrada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_compra: number;

  @Column()
  id_concierto: number;

  @Column()
  id_seccion: number;

  @Column({
    type: 'enum',
    enum: ['reservada', 'activa', 'cancelada'],
    default: 'reservada'
  })
  estado_entrada: 'reservada' | 'activa' | 'cancelada';

  @ManyToOne(() => Compra, compra => compra.entradas)
  @JoinColumn({ name: 'id_compra' })
  compra: Compra;

  @ManyToOne(() => Concierto)
  @JoinColumn({ name: 'id_concierto' })
  concierto: Concierto;

  @ManyToOne(() => Seccion)
  @JoinColumn({ name: 'id_seccion' })
  seccion: Seccion;
}