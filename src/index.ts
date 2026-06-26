import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";
import routes from "./routes/index.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 5000;

// DB connection check

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
