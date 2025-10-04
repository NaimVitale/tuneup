import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto'
import * as bcrypt from 'bcrypt';

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

  async findByEmail(email: string) {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async findAll() {
    return this.usuarioRepo.find();
  }

  async findOne(id: number) {
    return this.usuarioRepo.findOneBy({ id });
  }

  /*async update(id: number, dto: UpdateUserDto) {
    await this.usuarioRepo.update(id, dto);
    return this.usuarioRepo.findOneBy({ id });
  }*/

  async remove(id: number) {
    return this.usuarioRepo.delete(id);
  }
}