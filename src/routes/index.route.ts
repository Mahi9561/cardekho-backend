import { Router } from "express";
import authRoutes from "./auth.route";
import usersRoutes from "./user.route";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes);

export default routes;
