import { Router } from "express";
import {
  createModels,
  deleteModel,
  updateModels,
} from "../controllers/cars/model.controller";

const router = Router();

router.post("/models", createModels);
router.patch("/updateModels", updateModels);
router.delete("/deleteModel/:id", deleteModel);

export default router;
