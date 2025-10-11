import { Concierto } from "src/conciertos/entities/concierto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity ('artistas')
    export class Artista {

        @PrimaryGeneratedColumn()
        id: number;

        @Column({ type: 'varchar', length: 60 })
        nombre: string;

        @Column({ type: 'varchar', length: 200, unique : true })
        slug: string;

        @Column({ type: 'varchar', length: 500 })
        descripcion: string;

        @Column({ type: 'varchar', length: 500 })
        img_card: string;

        @Column({ type: 'longtext' })
        img_hero: any;

        @Column({ type: 'json' })
        images: any;

        @OneToMany(() => Concierto, (concierto) => concierto.artista)
        conciertos: Concierto[];
    }