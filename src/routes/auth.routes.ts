import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";
import * as AuthController from "../controllers/Auth/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);

// Protected Route
// router.get("/profile", authMiddleware, AuthController.profile);

// Admin Only Route
router.get(
  "/admin-data",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Admin Access Granted" });
  }
);

export default router;
