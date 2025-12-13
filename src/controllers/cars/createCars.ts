import { NextFunction, Request, Response } from "express";
import { contentTypeHeaderCheck, parseJsonRequestBody } from "../../utils/gateway-helper";
import ClientInputError from "../../utils/error-handler";
import { validateWithSchema } from "../../utils/input-validator";

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