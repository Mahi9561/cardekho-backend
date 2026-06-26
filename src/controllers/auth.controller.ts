import { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service";
import {
  contentTypeHeaderCheck,
  parseJsonRequestBody,
} from "../utils/gateway-helper";
import { validateWithSchema } from "../utils/input-validator";
import userRegisterSchema from "../utils/validation-schema/user.schema.validation";
import { ClientInputError } from "../utils/error-handler";
import userLoginSchema from "../utils/validation-schema/userLogin.Schema.validation";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!contentTypeHeaderCheck(req)) {
      return next(
        new ClientInputError("Content-Type must be application/json"),
      );
    }
    const parsedBody = await parseJsonRequestBody(req);
    validateWithSchema(userRegisterSchema, parsedBody);
    const response = await authService.registerUser(parsedBody);
    res.status(response.statusCode).json(response.message);
  } catch (error: any) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!contentTypeHeaderCheck(req)) {
      return next(
        new ClientInputError("Content-Type must be application/json"),
      );
    }
    const parsedBody = await parseJsonRequestBody(req);
    validateWithSchema(userLoginSchema, parsedBody);
    const response = await authService.loginUser(parsedBody);
    res.status(response.statusCode).json(response.message);
  } catch (error: any) {
    next(error);
  }
};
