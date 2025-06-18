import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectdb from "./config/db"
export const app =express()
dotenv.config()
const frontendurl="jfvnbjgnbrk"
app.use(
  cors({
    origin: `${frontenduel}`, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
// Middleware to parse JSON
app.use(express.json());
connectdb();