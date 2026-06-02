import { Router } from "express";
import { CuradoriaController } from "../controllers/curadoria.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();
const curadoriaController = new CuradoriaController();

router.use(authMiddleware);

router.post("/", curadoriaController.store);
router.get("/", curadoriaController.index);
router.get("/:id", curadoriaController.show);

router.patch("/:id", curadoriaController.update);
router.patch("/insight/:id", curadoriaController.createInsight);

router.delete("/:id", curadoriaController.delete);

export default router;
