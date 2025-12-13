import { NextFunction, Request, Response } from "express";
import { contentTypeHeaderCheck } from "../../utils/gateway-helper";
import ClientInputError from "../../utils/error-handler";

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (contentTypeHeaderCheck(req)) {
      return next(
        new ClientInputError("Content-Type must be application/json")
      );
    }

    const { brand, logo_url, model, variant, specs, images } = req.body;
  } catch (error) {}
};
