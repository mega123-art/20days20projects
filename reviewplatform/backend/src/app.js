import express from "express";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
export default app;

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/leaderboard", leaderboardRoutes);