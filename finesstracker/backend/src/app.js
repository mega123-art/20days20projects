import express from "express";
import connectdb from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import workRoutes from "./routes/workoutRoutes.js";
import authRoutes from "./routes/authroutes.js"
dotenv.config();
connectdb();
export const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/workouts",workRoutes)

