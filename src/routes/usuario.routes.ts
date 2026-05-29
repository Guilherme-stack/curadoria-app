import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/", usuarioController.create);
router.post("/auth/login", usuarioController.login);

export default router;
