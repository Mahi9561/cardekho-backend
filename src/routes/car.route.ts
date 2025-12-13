import { Router } from "express";
import { createCar } from "../controllers/cars/createCars";

const router = Router();

router.post("/", createCar);

export default router;
