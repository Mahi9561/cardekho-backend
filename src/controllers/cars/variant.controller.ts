import { NextFunction, Request, Response } from "express";
import {
  contentTypeHeaderCheck,
  parseJsonRequestBody,
} from "../../utils/gateway-helper";
import ClientInputError from "../../utils/error-handler";
import { validateWithSchema } from "../../utils/input-validator";
import variantSchema from "../../utils/validation-schema/variant-schema";
import * as variantService from "../../service/cars/variant.service";
import updateVariantSchema from "../../utils/validation-schema/variant-update-schema";

export const createVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!contentTypeHeaderCheck(req)) {
      throw new ClientInputError("Content-Type must be application/json");
    }

    const body = await parseJsonRequestBody(req);
    validateWithSchema(variantSchema, body);

    const response = await variantService.createVariantService(body);
    res.status(response.statuscode).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!contentTypeHeaderCheck(req)) {
      throw new ClientInputError("Content-Type must be application/json");
    }

    const body = await parseJsonRequestBody(req);
    validateWithSchema(updateVariantSchema , body);

    const response = await variantService.updateVariantService(body);
    res.status(response.statuscode).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const variantId = parseInt(req.params.id, 10);

    if (isNaN(variantId)) {
      throw new ClientInputError("Variant ID must be a valid number");
    }

    const response = await variantService.deleteVariantService(variantId);
    res.status(response.statuscode).json(response);
  } catch (error) {
    next(error);
  }
};
