import { Router } from "express";
import {
  loginUser,
  logoutUser,
  myProfile,
  registerUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, myProfile);

export default router;
