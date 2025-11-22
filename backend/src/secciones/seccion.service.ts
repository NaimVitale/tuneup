import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from './entities/seccion.entity';

@Injectable()
export class SeccionesService {
  constructor(
    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,
  ) {}

  async findAll(): Promise<Seccion[]> {
    return this.seccionRepository.find({ relations: ['recinto'] });
  }

  async findByRecintoWithPrecios(id_recinto: number, id_concierto?: number): Promise<Seccion[]> {
    const secciones = await this.seccionRepository.find({
      where: { recinto: { id: id_recinto } },
      relations: ['recinto', 'conciertosConPrecio', 'conciertosConPrecio.concierto'],
    });

    if (id_concierto) {
      // Mapeamos las secciones para adjuntar el precio del concierto actual
      return secciones.map(s => {
        const precioExistente = s.conciertosConPrecio?.find(c => c.concierto && c.concierto.id === id_concierto);
        return {
          ...s,
          precio: precioExistente?.precio ?? 0,
          id_precio: precioExistente?.id
        };
      });
    }

    // Si no hay concierto, simplemente precio = 0
    return secciones.map(s => ({ ...s, precio: 0, id_precio: undefined }));
  }

  async findOne(id: number): Promise<Seccion> {
    const seccion = await this.seccionRepository.findOne({
      where: { id },
      relations: ['recinto', 'conciertosConPrecio'],
    });
    if (!seccion) throw new NotFoundException(`Sección ${id} no encontrada`);
    return seccion;
  }

  async create(data: Partial<Seccion>): Promise<Seccion> {
    const seccion = this.seccionRepository.create(data);
    return this.seccionRepository.save(seccion);
  }

  async update(id: number, data: Partial<Seccion>): Promise<Seccion> {
    const seccion = await this.findOne(id);
    Object.assign(seccion, data);
    return this.seccionRepository.save(seccion);
  }

  async remove(id: number): Promise<void> {
    const seccion = await this.findOne(id);
    await this.seccionRepository.remove(seccion);
  }
}
