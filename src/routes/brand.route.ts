import { Router } from "express";
import {
  createBrand,
  updateBrand,
  getBrands,
  getBrandById,
  deleteBrand,
} from "../controllers/brand.controller";

const router = Router();

router.post("/createbrand", createBrand);
router.patch("/updateBrands", updateBrand);
router.get("/getbrands", getBrands);
router.get("/getbrand/:id", getBrandById);
router.delete("/deletebrand/:id", deleteBrand);

export default router;
