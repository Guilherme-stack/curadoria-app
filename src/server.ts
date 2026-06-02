import express from "express";
import cors, { CorsOptions } from "cors";
import curadoriaRoutes from "./routes/curadoria.routes";
import usuarioRouter from "./routes/usuario.routes";
import { env } from "./config/env";
const app = express();
app.use(express.json());

// 1. Defina o array com as URLs permitidas
const allowedOrigins = [
  "https://curadoria-front.vercel.app",
  "http://localhost:5173",
];

// 2. Configure as opções do CORS com a tipagem correta
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Se a origem estiver na lista ou se for uma requisição sem origem (ex: Postman/Mobile)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Bloqueado pelo CORS: Origem não permitida."));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use("/curadoria", curadoriaRoutes);
app.use("/usuario", usuarioRouter);

app.listen(env.PORT, () => {
  console.log(`\n 🚀 Servidor rodando no Docker!`);
  console.log(` 📍 Acesse em: http://localhost:${env.PORT} \n`);
});
