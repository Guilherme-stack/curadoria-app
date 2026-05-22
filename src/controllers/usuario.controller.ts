import { Response, Request } from "express";
import { UsuarioService } from "../services/usuario.service";

const service = new UsuarioService();
export class UsuarioController {
  async create(req: Request, res: Response) {
    const { email, senha, nome } = req.body;
    if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ message: "Campos de Email, Senha e Nome são obrigatórios!" });
    }

    try {
      const usuario = await service.criarUsuario({
        email,
        senha,
        nome,
      });

      return res.status(201).json(usuario);
    } catch (error: unknown) {
      console.error("Error", error);

      if (error instanceof Error && error.message === "EMAIL_JA_CADASTRADO") {
        return res.status(409).json({ message: "Email já está cadastrado" });
      }
      return res
        .status(500)
        .json({ message: "Erro interno ao criar usuário!" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são campos obrigatórios" });
    }

    try {
      const login = await service.login(email, senha);
      return res.status(200).send(login);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "CREDENCIAL_INVALIDA") {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      if (error instanceof Error && error.message === "ERRO_AO_GERAR_TOKEN") {
        return res.status(500).json({ message: "Erro ao fazer login!" });
      }
      return res
        .status(500)
        .json({ message: "Erro interno do sistema ao fazer login!" });
    }
  }
}
