import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import paymentRoutes from "./routes/paymentRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import scheduleRoutes from "./routes/scheduleRoutes.js"
import theatreRoutes from "./routes/theatreRoutes.js"
export const app = express();
connectdb();
dotenv.config();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "***",
  },
});
io.on("connection", (server) => {
  console.log("A user connected:", socket.id);

  socket.on("dissconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
  socket.on("joinSchedule", (scheduleId) => {
    console.log(`User joined schedule: ${scheduleId}`);
    socket.join(scheduleId);
  });
});
export { io };
