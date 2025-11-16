import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto'
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { UpdatePasswordDto } from './dtos/update-password-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioReadDto } from './dtos/read-usuario.dto';
import { CreateUsuarioAdminDto } from './dtos/create-usuario-admin.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (usuarioExistente) {
      throw new BadRequestException({ field: 'email', message: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const usuario = this.usuarioRepo.create({
      ...dto,
      password: hashedPassword,
    });
    return this.usuarioRepo.save(usuario);
  }

  async createAdmin(dto: CreateUsuarioAdminDto) {
    // Verificar si ya existe un usuario con ese email
    const usuarioExistente = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (usuarioExistente) {
      throw new BadRequestException({ field: 'email', message: 'El correo electrónico ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Crear el usuario con rol
    const usuario = this.usuarioRepo.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      password: hashedPassword,
      rol: dto.rol, // aquí sí se asigna rol
    });

    // Guardar en la base de datos
    return this.usuarioRepo.save(usuario);
  }

  async findAll() {
    return this.usuarioRepo.find({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
      }
    });
  }

  async newUsers() {
    const now = new Date();

    // Inicio y fin del día actual
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // Contar usuarios creados hoy
    const count = await this.usuarioRepo.count({
      where: {
        createdAt: Between(startOfDay, endOfDay),
      },
    });

    return count; // devuelve un número
  }

  async findByEmail(email: string) {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async findById( id: number){
    const usuario = await this.usuarioRepo.findOne({
      where : {id},
      select: ['id', 'nombre', 'apellido', 'email']
    })

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      select: ['id', 'nombre', 'apellido', 'email'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined) usuario[key] = value;
    });

    const usuarioActualizado = await this.usuarioRepo.save(usuario);

    return usuarioActualizado;
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const passwordValida = await bcrypt.compare(dto.oldPassword, usuario.password);
    if (!passwordValida) throw new BadRequestException('La contraseña actual es incorrecta');

    usuario.password = await bcrypt.hash(dto.newPassword, 10);
    await this.usuarioRepo.save(usuario);

    return { message: 'Contraseña actualizada correctamente' };
  }


  async remove(id: number) {
    return this.usuarioRepo.delete(id);
  }
}