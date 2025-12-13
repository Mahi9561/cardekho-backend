import { Router } from "express";
import { getAllCars } from "../controllers/cars/car.controller";

const router = Router();

router.get("/getAllCars", getAllCars);
// router.get("/car:id", getCarById);

export default router;
