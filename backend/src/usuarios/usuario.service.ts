import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto'
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { UpdatePasswordDto } from './dtos/update-password-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioReadDto } from './dtos/read-usuario.dto';

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