import { Concierto } from "src/conciertos/entities/concierto.entity";
import { Genero } from "src/generos/entities/genero.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

        @Column({ type: 'longtext' })
        images: any;

        @OneToMany(() => Concierto, (concierto) => concierto.artista)
        @JoinColumn({ name: 'id_artista' })
        conciertos: Concierto[];

        @ManyToOne(() => Genero)
        @JoinColumn({ name: 'id_genero' })
        genero: Genero;
        
        @DeleteDateColumn({ type: 'timestamp', nullable: true })
        deleted_at?: Date;
    }