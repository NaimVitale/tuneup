import { Compra } from 'src/compras/entities/compra.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export enum RolUsuario {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido?: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  password: string | null;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.USER,
  })
  rol: RolUsuario;

  @Column({
    name: 'auth_provider',
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  authProvider: AuthProvider;

  @Column({name:'google_id', nullable: true })
  googleId?: string;

  @Column({name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ 
    name: 'email_verification_token', 
    type: 'varchar', 
    length: 36, // UUID estándar
    nullable: true 
  })
  emailVerificationToken?: string | null;

  @Column({name: 'email_verification_expires', type: 'timestamp', nullable: true })
  emailVerificationExpires?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Compra, compra => compra.usuario)
  compras: Compra[];
}