import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import userRoutes from "./routes/recipeRoutes.js";
dotenv.config();
connectdb();

export const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("src/uploads/resized"));
