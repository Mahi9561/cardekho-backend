import { NextFunction, Request, Response } from "express";
import * as AuthService from "../../service/Auth/auth.service";
import { contentTypeHeaderCheck } from "../../utils/gateway-helper";
import ClientInputError from "../../utils/error-handler";

// export default class AuthController {

export const register = async (
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
    const user = await AuthService.register(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (
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

    const { email, password } = req.body;

    const response = await AuthService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: response,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const logout = async (req: any, res: Response, next: NextFunction) => {
  try {


    const userId = req.user?.id;
    const token = req.headers.authorization?.split(" ")[1];

    if (!userId || !token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const response = await AuthService.logout(userId, token);

    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
