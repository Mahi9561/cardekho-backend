import { NextFunction, Request, Response } from "express";
import {
  contentTypeHeaderCheck,
  parseJsonRequestBody,
} from "../utils/gateway-helper";
import * as brandService from "../service/brand.service";
import { validateWithSchema } from "../utils/input-validator";
import brandSchema from "../utils/validation-schema/brand-schema";
import { ClientInputError } from "../utils/error-handler";

export const createBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!contentTypeHeaderCheck(req)) {
      return next(
        new ClientInputError("Content-Type must be application/json")
      );
    }

    const body = await parseJsonRequestBody(req);
    console.log(body);
    validateWithSchema(brandSchema, body);

    const response = await brandService.brandService(body);
    res.status(response.statuscode).json(response);
  } catch (error) {
    console.error("createBrand error:", error);
    return next(error);
  }
};

export const updateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!contentTypeHeaderCheck(req)) {
      return next(
        new ClientInputError("Content-Type must be application/json")
      );
    }
    const body = await parseJsonRequestBody(req);
    const result = await brandService.updateBrandService(body);

    return res.status(result.statuscode).json(result.response);
  } catch (error) {
    next(error);
  }
};

export const getBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await brandService.getAllBrands();
    return res.status(response.statuscode).json(response);
  } catch (error) {
    console.error("Error fetching brands:", error);
    next(error);
  }
};

export const getBrandById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const brandId = parseInt(id);
    console.log("Received brand ID:", brandId);

    if (isNaN(brandId)) {
      return next(new ClientInputError("Brand ID must be a valid number"));
    }

    const response = await brandService.getBrandById(brandId);
    return res.status(response.statuscode).json(response);
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    next(error);
  }
};

export const deleteBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const brandId = parseInt(id);
    console.log("Deleting brand with ID:", brandId);

    if (isNaN(brandId)) {
      return next(new ClientInputError("Brand ID must be a valid number"));
    }

    const response = await brandService.deleteBrandService(brandId);
    return res.status(response.statuscode).json(response.response);
  } catch (error) {
    console.error("Error deleting brand:", error);
    next(error);
  }
};
