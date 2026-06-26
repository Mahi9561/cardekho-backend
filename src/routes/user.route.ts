import { Router, Request, Response } from "express";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";
import { getAllUsers, getUserbyId } from "../controllers/user.controller";

const router = Router();

router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  getUserbyId,
);

export default router;
