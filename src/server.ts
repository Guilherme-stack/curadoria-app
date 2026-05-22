import express from "express";
import curadoriaRoutes from "./routes/curadoria.routes";
import usuarioRouter from "./routes/usuario.routes";
import { env } from "./config/env";

const app = express();
app.use(express.json());

app.use("/curadoria", curadoriaRoutes);
app.use("/usuario", usuarioRouter);

app.listen(env.PORT, () => {
  console.log(`\n 🚀 Servidor rodando no Docker!`);
  console.log(` 📍 Acesse em: http://localhost:${env.PORT} \n`);
});
