import express from "express";
import dotenv from "dotenv";
import http from "http";
import sockethandlerandler from "./socket.js";
import { Server } from "socket.io";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
dotenv.config();
const app = express();
const server = http.createServer(app);
export const io = new Server(server);
sockethandlerandler(io)
connectdb();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("api/auth",authRoutes)
export default app
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));