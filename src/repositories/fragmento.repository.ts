import {
  IFragmento,
  IFragmentoCreate,
  IFragmentoInput,
} from "../@types/fragmento";
import { prisma } from "../config/database";

export class FragmentoRepository {
  async create(data: IFragmentoCreate) {
    return await prisma.fragmento.create({
      data,
    });
  }
  async findAll(usuarioId: string) {
    return await prisma.fragmento.findMany({
      where: { usuarioId },
    });
  }

  async findById(id: string, usuarioId: string) {
    return prisma.fragmento.findFirst({
      where: { id, usuarioId },
    });
  }
  async delete(id: string, usuarioId: string) {
    return await prisma.fragmento.delete({
      where: { id, usuarioId },
    });
  }

  async update(id: string, usuarioId: string, dados: Partial<IFragmentoInput>) {
    return await prisma.fragmento.update({
      where: { id, usuarioId },
      data: dados,
    });
  }
}
