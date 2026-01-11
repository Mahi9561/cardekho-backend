import { Router } from "express";
import { getBrands, getBrandById } from "../controllers/brand.controller";

const router = Router();

router.get("/getbrands", getBrands);
router.get("/getbrand/:id", getBrandById);

export default router;
