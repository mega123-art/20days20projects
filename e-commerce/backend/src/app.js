import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import productRoutes from "./routes/productroutes.js";
import cartRoutes from "./routes/cartroutes.js";
import paymentRoutes from "./routes/paymentroutes.js";
import orderRoutes from "./routes/orderroutes.js";

dotenv.config(); // Load .env variables

connectdb(); //conencting database
export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
