import { Request, Response, NextFunction } from "express";
import * as carService from "../../service/cars/cars.service";
import { validateWithSchema } from "../../utils/input-validator";
import carFilterSchema from "../../utils/validation-schema/car-filter-schema";

export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const raw = { ...req.query } as Record<string, unknown>;
    // Normalize case-insensitive values from query
    const filters: Record<string, unknown> = {
      ...raw,
      fuel_type:
        typeof raw.fuel_type === "string"
          ? raw.fuel_type.trim()
          : raw.fuel_type,
      transmission:
        typeof raw.transmission === "string"
          ? raw.transmission.trim()
          : raw.transmission,
    };
    validateWithSchema(carFilterSchema, filters);
    const response = await carService.getAllCars(filters);
    return res.status(response.statuscode).json(response.response);
  } catch (error) {
    console.error("Error fetching cars:", error);
    next(error);
  }
};
