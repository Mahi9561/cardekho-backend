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
    validateWithSchema(brandSchema, body);

    const response = await brandService.updateBrandService(body);
    return res.status(response.statuscode).json(response);
  } catch (error) {
    console.error("Error updating brand:", error);
    next(error);
  }
};
