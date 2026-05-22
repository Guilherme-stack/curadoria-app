export interface IFragmentoInput {
  titulo: string;
  autor: string;
  categoria: string;
  conteudo: string;
  tags: string[];
  fonte: string;
  usuarioId: string;
}

export interface IFragmento extends IFragmentoInput {
  id: string;
  createdAt: Date;
  insight: string | null;
}

export type IFragmentoCreate = IFragmentoInput;
