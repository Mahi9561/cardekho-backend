import { Router } from "express";
import {
  createVariant,
  deleteVariant,
  updateVariant,
} from "../controllers/cars/variant.controller";

const router = Router();

router.post("/variant", createVariant);
router.patch("/updatevariant", updateVariant);
router.delete("/deletevariant/:id", deleteVariant);

export default router;
