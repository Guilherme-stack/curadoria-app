import { IFragmento, IFragmentoCreate } from "../@types/fragmento";
import { FragmentoRepository } from "../repositories/fragmento.repository";
import { gerarInsight } from "./ia.service";

export class CuradoriaService {
  private repository = new FragmentoRepository();

  async criarCuradoria(data: IFragmentoCreate) {
    const fragmento = await this.repository.create(data);
    try {
      const insight = await gerarInsight({
        autor: fragmento.autor,
        categoria: fragmento.categoria,
        conteudo: fragmento.conteudo,
        titulo: fragmento.titulo,
        usuarioId: fragmento.usuarioId,
      });
      const fragmentoAtualizado = await this.editarCuradoria(
        fragmento.id,
        fragmento.usuarioId,
        {
          insight,
        },
      );

      return fragmentoAtualizado;
    } catch (error) {
      console.error(error);
      return fragmento;
    }
  }

  async listarCuradorias(usuarioId: string) {
    return this.repository.findAll(usuarioId);
  }

  async buscarPorId(id: string, usuarioId: string) {
    return this.repository.findById(id, usuarioId);
  }

  async deletarCuradoria(id: string, usuarioId: string) {
    return this.repository.delete(id, usuarioId);
  }

  async editarCuradoria(
    id: string,
    usuarioId: string,
    dados: Partial<IFragmento>,
  ) {
    return this.repository.update(id, usuarioId, dados);
  }
}
