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

export const logoutUser = async (
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
    console.log("req.headers.authorization", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const result = await authService.logoutUser(token);

    res.status(result.statusCode).json({
      success: result.statusCode === 200,
      message: result.message,
    });
  } catch (error: any) {
    next(error);
  }
};

export const myProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      return next(new ClientInputError("Authenticated user id is required"));
    }
    const response = await authService.myProfile(userId);
    res.status(response.statusCode).json(response.message);
  } catch (error: any) {
    next(error);
  }
};
