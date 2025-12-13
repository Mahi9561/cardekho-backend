import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "mysecretkey"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const roleMiddleware = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: No access" });
    }
    next();
  };
};
