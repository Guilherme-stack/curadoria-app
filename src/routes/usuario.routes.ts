import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/", usuarioController.create);
router.post("/auth/login", usuarioController.login);
router.get("/auth/me", authMiddleware, usuarioController.me);

export default router;
