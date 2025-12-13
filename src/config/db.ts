import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database successfully!");
});

export default db;
