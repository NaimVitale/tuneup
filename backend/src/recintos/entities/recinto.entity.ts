import { Ciudad } from "src/ciudades/entities/ciudad.entity";
import { Concierto } from "src/conciertos/entities/concierto.entity";
import { Seccion } from "src/secciones/entities/seccion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("recintos")
export class Recinto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    nombre: string;

    @Column({type: 'varchar', length: 100})
    ubicacion: string;

    @Column({type: 'json'})
    svg_map: any;

    @ManyToOne(() => Ciudad, ciudad => ciudad.recintos, {
        onDelete: 'SET NULL',
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'id_ciudad' })
    ciudad: Ciudad;

    @OneToMany(() => Concierto, (concierto) => concierto.recinto)
    conciertos: Concierto[];

    @OneToMany(() => Seccion, (seccion) => seccion.recinto, { cascade: true, eager: true })
    secciones: Seccion[];
}
