import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Recinto } from "src/recintos/entities/recinto.entity";
import { PreciosSeccionConcierto } from "src/precios-seccion-concierto/entities/precios-seccion-concierto.entity";

@Entity('secciones')
export class Seccion {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ type: 'varchar', length: 100 })
  tipo_svg: string;

  @Column({ type: 'varchar', length: 500 })
  svg_path: string;

  @ManyToOne(() => Recinto, (recinto) => recinto.secciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_recinto' })
  recinto: Recinto;

  @OneToMany(() => PreciosSeccionConcierto, csp => csp.seccion)
  conciertosConPrecio: PreciosSeccionConcierto[];
}