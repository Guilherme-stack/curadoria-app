import express from "express";
import cors from "cors";
import curadoriaRoutes from "./routes/curadoria.routes";
import usuarioRouter from "./routes/usuario.routes";
import { env } from "./config/env";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://curadoria-front.vercel.app",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/curadoria", curadoriaRoutes);
app.use("/usuario", usuarioRouter);

app.listen(env.PORT, () => {
  console.log(`\n 🚀 Servidor rodando no Docker!`);
  console.log(` 📍 Acesse em: http://localhost:${env.PORT} \n`);
});
