# Curadoria API

Backend de uma aplicação de curadoria cultural com inteligência artificial. O sistema recebe fragmentos de texto — trechos de músicas, livros, falas — e gera interpretações culturais profundas usando IA, conectando filosofia, psicologia e sociologia ao conteúdo enviado.

## Funcionalidades

- Cadastro e autenticação de usuários com JWT
- CRUD completo de curadorias por usuário autenticado
- Geração automática de insights culturais via Google Gemini
- Fallback seguro — fragmento salvo mesmo se a IA falhar

## Tecnologias

- Node.js + TypeScript
- Express 5
- Prisma ORM + PostgreSQL
- Docker + Docker Compose
- JWT para autenticação
- bcryptjs para hash de senhas
- Google Gemini API

## Arquitetura

O projeto segue separação em camadas:

- **Routes** — define os endpoints HTTP
- **Controllers** — recebe requisições, valida body, retorna respostas
- **Services** — lógica de negócio e orquestração
- **Repositories** — acesso ao banco via Prisma
- **Middlewares** — autenticação JWT nas rotas protegidas

## Como rodar localmente

**Pré-requisitos:** Docker e Docker Compose instalados

1. Clone o repositório

```bash
git clone https://github.com/Guilherme-stack/curadoria-app.git
cd curadoria-app
```

2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha o `.env`:
DATABASE_URL=postgresql://postgres:postgres@db:5432/curadoria
GEMINI_API_KEY=sua_chave_aqui
JWT_SECRET=sua_string_secreta_aqui
PORT=3000 3. Suba os containers

```bash
docker compose up --build
```

4. Em outro terminal, rode as migrations

```bash
docker exec -it nome_do_container npx prisma migrate deploy
```

A API estará disponível em `http://localhost:3000`

## Endpoints

### Autenticação

| Método | Rota        | Descrição                    |
| ------ | ----------- | ---------------------------- |
| POST   | /usuario    | Criar conta                  |
| POST   | /auth/login | Login                        |
| GET    | /auth/me    | Dados do usuário autenticado |

### Curadorias (requer autenticação)

| Método | Rota           | Descrição                       |
| ------ | -------------- | ------------------------------- |
| GET    | /curadoria     | Listar curadorias do usuário    |
| POST   | /curadoria     | Criar curadoria + gerar insight |
| GET    | /curadoria/:id | Buscar curadoria por ID         |
| PATCH  | /curadoria/:id | Atualizar curadoria             |
| DELETE | /curadoria/:id | Deletar curadoria               |

## Deploy

API em produção: `sua-url.up.railway.app`

Hospedado no Railway com PostgreSQL gerenciado.

## Variáveis de ambiente necessárias

Crie um `.env` baseado no `.env.example`:

| Variável       | Descrição                              |
| -------------- | -------------------------------------- |
| DATABASE_URL   | String de conexão PostgreSQL           |
| GEMINI_API_KEY | Chave da API do Google Gemini          |
| JWT_SECRET     | String secreta para assinar tokens JWT |
| PORT           | Porta do servidor (padrão: 3000)       |
