import { IUsuarioInput } from "../@types/usuario";
import { env, getEnv } from "../config/env";
import { UsuarioRepository } from "../repositories/usuario.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class UsuarioService {
  private repository = new UsuarioRepository();

  async criarUsuario(dados: IUsuarioInput) {
    console.log(dados, "teste");
    const usuarioExistente = await this.repository.findByEmail(dados.email);
    if (usuarioExistente) {
      throw new Error("EMAIL_JA_CADASTRADO");
    }

    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
    return await this.repository.create({
      ...dados,
      senha: senhaCriptografada,
    });
  }

  async login(email: string, senha: string) {
    const usuarioExistente = await this.repository.findByEmail(email);
    if (!usuarioExistente) {
      throw new Error("CREDENCIAL_INVALIDA");
    }
    const senhaCorreta = await bcrypt.compare(senha, usuarioExistente.senha);
    if (!senhaCorreta) {
      throw new Error("CREDENCIAL_INVALIDA");
    }

    const token = jwt.sign(
      { id: usuarioExistente.id, email: usuarioExistente.email },
      env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      token,
      usuario: {
        id: usuarioExistente.id,
        nome: usuarioExistente.nome,
        email: usuarioExistente.email,
      },
    };
  }

  async buscaPorEmail(email: string) {
    return await this.repository.findByEmail(email);
  }

  async deletarUsuario(id: string) {
    return await this.repository.delete(id);
  }
}
