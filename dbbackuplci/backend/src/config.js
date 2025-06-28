import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
export function getConfig() {
  const config = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    db: process.env.DB_NAME || "",
    user: process.env.DB_USER || "",
    pass: process.env.DB_PASS || "",
    defaultDest: "./backup",
  };

  if (!config.db) {
    throw new Error(
      "Database name (DB_NAME) is required in the environment variables or CLI options."
    );
  }

  return config;
}
