import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('conciertos')
    export class Concierto {

        @PrimaryGeneratedColumn()
        id: number;

        @Column('datetime')
        fecha: Date;
    }