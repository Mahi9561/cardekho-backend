import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";
import routes from "./routes/index.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // replaces body-parser
app.use("/", routes);

const PORT = process.env.PORT || 5000;

// Optional: env validation
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  console.error("❌ Missing required database environment variables.");
  process.exit(1);
}

// DB connection check
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Server Error:", err);
  const status = err && (err.status || err.statusCode) ? (err.status || err.statusCode) : 500;
  const message = err && err.message ? err.message : "Internal Server Error";
  res.status(status).json({ error: message });
});
