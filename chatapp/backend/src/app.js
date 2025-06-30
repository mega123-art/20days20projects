import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectdb from "./config/db.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
connectdb();
app.use(express.json());
export default app
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));