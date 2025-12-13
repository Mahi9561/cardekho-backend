import { NextFunction, Request, Response } from "express";
import {
  contentTypeHeaderCheck,
  parseJsonRequestBody,
} from "../../utils/gateway-helper";
import ClientInputError from "../../utils/error-handler";
import { validateWithSchema } from "../../utils/input-validator";
import modelSchema from "../../utils/validation-schema/model-schema";
import * as modelService from "../../service/cars/model.service";
import variantSchema from "../../utils/validation-schema/variant-schema";

export const createModels = async (
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
    validateWithSchema(modelSchema, body);

    const response = await modelService.createModels(body);
    res.status(response.statuscode).json(response);
  } catch (error) {
    console.error("createBrand error:", error);
    return next(error);
  }
};

export const updateModels = async (
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
    // validateWithSchema(modelSchema, body);
    const result = await modelService.updateModelService(body);

    return res.status(result.statuscode).json(result.response);
  } catch (error) {
    next(error);
  }
};

export const deleteModel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const modelId = parseInt(id);
    console.log("Deleting brand with ID:", modelId);

    if (isNaN(modelId)) {
      return next(new ClientInputError("Brand ID must be a valid number"));
    }

    const response = await modelService.deleteModelService(modelId);
    return res.status(response.statuscode).json(response.response);
  } catch (error) {
    console.error("Error deleting brand:", error);
    next(error);
  }
};