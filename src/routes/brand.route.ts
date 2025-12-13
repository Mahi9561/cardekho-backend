import { Router } from "express";
import { createBrand, updateBrand } from "../controllers/brand.controller";

const router = Router();

router.post("/createbrand", createBrand);
router.patch("/upatebrand", updateBrand);

export default router;
