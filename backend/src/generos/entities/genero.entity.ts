import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity ('generos')
    export class Genero {
        
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ type: 'varchar', length: 50, unique : true })
        nombre: string;

        @Column({ type: 'varchar', length: 200 })
        descripcion: string;

        @Column({ type: 'datetime', nullable: true })
        deleted_at: Date | null;

    }