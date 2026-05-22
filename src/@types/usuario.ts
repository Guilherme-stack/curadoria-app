import { IFragmento } from "./fragmento";

export interface IUsuarioInput {
  nome: string;
  email: string;
  senha: string;
}

export interface IUsuario extends IUsuarioInput {
  id: string;
  createdAt: Date;
  fragmentos: IFragmento[];
}
