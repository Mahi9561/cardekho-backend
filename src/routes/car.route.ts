import { Router } from "express";
import { getAllCars, getCarById } from "../controllers/cars/car.controller";

const router = Router();

router.get("/getAllCars", getAllCars);
router.get("/:id", getCarById);

export default router;
