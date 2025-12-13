import { Router } from "express";
import brandRoutes from "./brand.route";
import authRoutes from "./auth.routes";
import { authMiddleware } from "../middleware/authMiddleware";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use(authMiddleware);
routes.use("/brand", brandRoutes);

export default routes;