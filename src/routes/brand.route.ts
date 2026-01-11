import { Router } from "express";
import {
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller";

const router = Router();

router.post("/createbrand", createBrand);
router.patch("/updateBrands", updateBrand);
router.delete("/deletebrand/:id", deleteBrand);

export default router;
