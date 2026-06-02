import { IUsuarioInput } from "../@types/usuario";
import { prisma } from "../config/database";

export class UsuarioRepository {
  async create(data: IUsuarioInput) {
    return await prisma.usuario.create({
      data: data,
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true }, // sem senha
    });
  }

  async delete(id: string) {
    return await prisma.usuario.delete({
      where: { id },
    });
  }
}
