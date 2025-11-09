import { Entrada } from 'src/entradas/entities/entrada.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_usuario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  stripe_payment_id: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @OneToMany(() => Entrada, entrada => entrada.compra)
  entradas: Entrada[];

  @ManyToOne(() => Usuario, usuario => usuario.compras)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
