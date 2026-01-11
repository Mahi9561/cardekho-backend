import { Router } from "express";
import brandRoutes from "./brand.route";
import authRoutes from "./auth.routes";
import modelRoutes from "./model.route";
import variantRoutes from "./variant.route";
import carsRoutes from "./car.route";
import { authMiddleware } from "../middleware/authMiddleware";
import publicBrandRoutes from "./publicBrandRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/cars", carsRoutes);
routes.use("/brand", publicBrandRoutes);
routes.use(authMiddleware);
routes.use("/brand", brandRoutes);
routes.use("/model", modelRoutes);
routes.use("/variant", variantRoutes);

export default routes;
