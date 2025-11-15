import { Artista } from "src/artistas/entities/artista.entity";
import { Entrada } from "src/entradas/entities/entrada.entity";
import { PreciosSeccionConcierto } from "src/precios-seccion-concierto/entities/precios-seccion-concierto.entity";
import { Recinto } from "src/recintos/entities/recinto.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum EstadoConcierto {
  PROXIMAMENTE = 'proximamente',
  ACTIVO = 'activo',
  FINALIZADO = 'finalizado',
}

@Entity('conciertos')
    export class Concierto {

        @PrimaryGeneratedColumn()
        id: number;

        @Column('datetime')
        fecha: Date;

        @Column()
        id_artista: number;

        @Column()
        id_recinto: number;

        @Column({ type: 'enum', enum: EstadoConcierto, default: EstadoConcierto.PROXIMAMENTE })
        estado: EstadoConcierto;

        @Column('datetime', { nullable: true })
        fecha_venta: Date | null;

        @ManyToOne(() => Artista, (artista) => artista.conciertos)
        @JoinColumn({ name: 'id_artista' })
        artista: Artista;

        @ManyToOne(() => Recinto, (recinto) => recinto.conciertos)
        @JoinColumn({ name: 'id_recinto' })
        recinto: Recinto;

        @OneToMany(() => PreciosSeccionConcierto, csp => csp.concierto,  { cascade: true })
        preciosPorSeccion: PreciosSeccionConcierto[];

        @OneToMany(() => Entrada, (entrada) => entrada.concierto)
        entradas: Entrada[];

        @DeleteDateColumn({ type: 'timestamp', nullable: true })
        deleted_at?: Date;
    }