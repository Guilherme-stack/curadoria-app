import { Request, Response } from "express";
import { CuradoriaService } from "../services/curadoria.service";
import { isPrismaError } from "../utils/isPrismaError";
import { IFragmentoInput } from "../@types/fragmento";

const curadoriaService = new CuradoriaService();

export class CuradoriaController {
  async store(req: Request, res: Response) {
    try {
      const { titulo, autor, categoria, conteudo, tags, fonte } = req.body;
      if (!titulo || !autor || !categoria || !conteudo) {
        return res.status(400).json({
          message:
            "Campos Titulo, Autor, Categoria e Conteudo são obrigatórios!",
        });
      }

      if (!req.usuario) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }
      const novaCuradoria = await curadoriaService.criarCuradoria({
        titulo,
        autor,
        categoria,
        conteudo,
        usuarioId: req.usuario.id,
        tags: tags ?? [],
        fonte: fonte ?? "",
      });
      return res.status(201).json(novaCuradoria);
    } catch (error) {
      console.error("Erro ao criar curadoria:", error);
      return res.status(500).json({ error: "Erro ao criar curadoria" });
    }
  }

  async index(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }
      const curadorias = await curadoriaService.listarCuradorias(
        req.usuario.id,
      );
      return res.json(curadorias);
    } catch (error) {
      console.error("Erro ao listar curadorias:", error);
      return res.status(500).json({ error: "Erro ao listar curadorias" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }
      const curadorias = await curadoriaService.buscarPorId(
        req.params.id as string,
        req.usuario.id,
      );
      if (!curadorias) {
        return res.status(404).json({ error: "Curadoria não encontrada" });
      }
      return res.json(curadorias);
    } catch (error) {
      console.error("Erro ao buscar curadoria por ID:", error);
      return res.status(500).json({ error: "Erro ao buscar curadoria por ID" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.usuario) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }

      await curadoriaService.deletarCuradoria(id as string, req.usuario.id);
      res.status(204).send();
    } catch (error: unknown) {
      console.error("Erro ao deletar curadoria:", error);
      if (isPrismaError(error) && error.code === "P2025") {
        return res.status(404).json({ error: "Curadoria não encontrada" });
      }
      return res.status(500).json({ error: "Erro ao deletar curadoria" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados: Partial<IFragmentoInput> = req.body;

      if (!req.usuario) {
        return res.status(401).json({ message: "Usuário não autenticado!" });
      }

      if (Object.keys(dados).length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum campo enviado para atualização." });
      }

      const curadoria = await curadoriaService.editarCuradoria(
        id as string,
        req.usuario.id,
        dados,
      );

      res.status(200).json(curadoria);
    } catch (error: unknown) {
      console.error("Erro ao editar curadoria", error);

      if (isPrismaError(error) && error.code === "P2025") {
        return res.status(404).json({ message: "Curadoria não encontrada" });
      }
      return res.status(500).json({ message: "Erro ao atualizar curadoria" });
    }
  }
}
