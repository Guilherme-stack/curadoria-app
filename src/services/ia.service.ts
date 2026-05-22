import { GoogleGenerativeAI } from "@google/generative-ai";
import { IFragmentoInput } from "../@types/fragmento";
import { env } from "../config/env";
const ia = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export type IGerarInsight = Omit<IFragmentoInput, "tags" | "fonte">;

export async function gerarInsight(dados: IGerarInsight) {
  const modelo = ia.getGenerativeModel({
    model: "gemini-3.5-flash",
  });

  const prompt = `
  Você é um curador cultural com escrita clara e reveladora.

  Analise o fragmento abaixo e escreva um parágrafo que elucide 
  o que está nas entrelinhas — o que o autor quis dizer além das palavras,
  as camadas filosóficas, psicológicas ou humanas presentes no conteúdo.

  Tom: acessível e profundo ao mesmo tempo. Como um amigo muito lido 
  explicando algo complexo de forma que finalmente faz sentido.
  Sem jargões acadêmicos. Sem palavras difíceis desnecessárias.
  A profundidade deve vir das ideias, não do vocabulário.

  Retorne apenas o parágrafo. Sem títulos, sem introduções, sem "Este fragmento...".
  Escreva como se estivesse falando diretamente para quem enviou o trecho.

  Categoria: ${dados.categoria}
  Autor: ${dados.autor}
  Título: ${dados.titulo}
  Fragmento: ${dados.conteudo}
`;

  const result = (await modelo.generateContent(prompt)).response.text();
  if (!result) {
    throw new Error("Não foi possível gerar Insight!");
  }

  return result;
}
