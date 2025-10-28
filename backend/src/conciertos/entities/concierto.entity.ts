import { Artista } from "src/artistas/entities/artista.entity";
import { PreciosSeccionConcierto } from "src/precios-seccion-concierto/entities/precios-seccion-concierto.entity";
import { Recinto } from "src/recintos/entities/recinto.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

        @ManyToOne(() => Artista, (artista) => artista.conciertos)
        @JoinColumn({ name: 'id_artista' })
        artista: Artista;

        @ManyToOne(() => Recinto, (recinto) => recinto.conciertos)
        @JoinColumn({ name: 'id_recinto' })
        recinto: Recinto;

        @OneToMany(() => PreciosSeccionConcierto, csp => csp.concierto)
        preciosPorSeccion: PreciosSeccionConcierto[];
    }