import { Recinto } from "src/recintos/entities/recinto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity ('ciudades')
    export class Ciudad {

        @PrimaryGeneratedColumn()
        id: number;

        @Column({ type: 'varchar', length: 200, unique : true })
        nombre: string;

        @OneToMany(() => Recinto, (recinto) => recinto.ciudad)
        recintos: Recinto[];
    }