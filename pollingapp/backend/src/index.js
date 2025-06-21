import express from "express";
import http from "http";
import { Server } from "socket.io";

import { getPollResults, vote, createPoll } from "./polls.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173", // Replace with your client's origin
    methods: ["GET", "POST"],
  },
});

let poll = null;
let polltimer = null;

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("createpoll", ({ question, options, duration }) => {
    poll = createPoll(question, options);
    io.emit("pollupdate", poll);
    if (polltimer) clearTimeout(polltimer);
    polltimer = setTimeout(() => {
      poll.isopen = false;
      io.emit("pollresults", getPollResults());
    }, duration * 1000);
  });

  socket.on("vote", (option) => {
    if (poll && poll.isopen) {
      vote(option);
      io.emit("pollupdate", poll);
    }
  });

  socket.emit("pollupdate", poll);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
server.listen(8080, () => {
  console.log("Polling system server running on http://localhost:8080");
});
