import { Request, Response, NextFunction } from "express";
import * as carService from "../../service/cars/cars.service";
import { validateWithSchema } from "../../utils/input-validator";
import carFilterSchema from "../../utils/validation-schema/car-filter-schema";
import carIdSchema from "../../utils/validation-schema/car-id-schema";

export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const raw = { ...req.query } as Record<string, unknown>;

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

      launch_year: raw.launch_year ? Number(raw.launch_year) : undefined,
      price_min: raw.price_min ? Number(raw.price_min) : undefined,
      price_max: raw.price_max ? Number(raw.price_max) : undefined,

      mileage_min: raw.mileage_min ? Number(raw.mileage_min) : undefined,
      mileage_max: raw.mileage_max ? Number(raw.mileage_max) : undefined,

      engine_min: raw.engine_min ? Number(raw.engine_min) : undefined,
      engine_max: raw.engine_max ? Number(raw.engine_max) : undefined,

      seating_capacity: raw.seating_capacity
        ? Number(raw.seating_capacity)
        : undefined,

      safety_rating_min: raw.safety_rating_min
        ? Number(raw.safety_rating_min)
        : undefined,
    };

    validateWithSchema(carFilterSchema, filters);

    const response = await carService.getAllCars(filters);

    return res.status(response.statuscode).json(response.response);
  } catch (error) {
    console.error("Error fetching cars:", error);
    next(error);
  }
};


export const getCarById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    validateWithSchema(carIdSchema, { id });
    const response = await carService.getCarById(id);
    return res.status(response.statuscode).json(response.response);
  } catch (error) {
    console.error("Error fetching car by id:", error);
    next(error);
  }
};
