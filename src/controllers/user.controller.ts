import { Request, Response, NextFunction } from "express";
import * as userService from "../service/user.service";
import { ClientInputError } from "../utils/error-handler";
import {
  contentTypeHeaderCheck,
  parseJsonRequestBody,
} from "../utils/gateway-helper";

export const getAllUsers = async (
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
    const response = await userService.getAllUsers();
    res.status(response.statusCode).json(response.message);
  } catch (error: any) {
    next(error);
  }
};

export const getUserbyId = async (
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
    const { id } = req.params;
    const response = await userService.getUserById(parseInt(id));
    res.status(response.statusCode).json(response.message);
  } catch (error: any) {
    next(error);
  }
};
