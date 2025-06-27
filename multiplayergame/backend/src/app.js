import express from "express";
import http from "http";
import { Server } from "socket.io";
export default app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
const players = {};
const games = {};
app.get("/", (req, res) => {
  res.send("Multiplayer Battleship Server is running!");
});
const validateBoard = (board) => {
  return (
    Array.isArray(board) &&
    board.length === 10 &&
    board.every((row) => row.length === 10)
  );
};

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);
  players[socket.id] = {
    status: "waiting",
    board: null,
    opponent: null,
  };

  io.emit("player-count", Object.keys(players).length);
  socket.on("setup-board", (board) => {
    if (!validateBoard(board)) {
      socket.emit("error", "Invalid board setup");
      return;
    }

    players[socket.id].board = board;
    players[socket.id].status = "ready";

    console.log(`Player ${socket.id} is ready`);

    // Try to pair players
    const waitingPlayers = Object.keys(players).filter(
      (id) => players[id].status === "ready" && id !== socket.id
    );

    if (waitingPlayers.length > 0) {
      const opponentId = waitingPlayers[0];
      const gameId = `${socket.id}-${opponentId}`;

      // Pair the players
      players[socket.id].status = "in-game";
      players[socket.id].opponent = opponentId;

      players[opponentId].status = "in-game";
      players[opponentId].opponent = socket.id;

      // Initialize the game state
      games[gameId] = {
        players: [socket.id, opponentId],
        turn: socket.id,
      };

      console.log(`Game started between ${socket.id} and ${opponentId}`);

      io.to(socket.id).emit("game-start", { opponent: opponentId, turn: true });
      io.to(opponentId).emit("game-start", {
        opponent: socket.id,
        turn: false,
      });
    }
  });
  socket.on("make-move", (move) => {
    const { opponent } = players[socket.id];
    if (!opponent) {
      socket.emit("error", "You are not in a game.");
      return;
    }

    const gameId =
      `${socket.id}-${opponent}` in games
        ? `${socket.id}-${opponent}`
        : `${opponent}-${socket.id}`;
    const game = games[gameId];

    if (game.turn !== socket.id) {
      socket.emit("error", "It's not your turn.");
      return;
    }

    const { x, y } = move; // Expecting {x: 3, y: 2} as move
    const opponentBoard = players[opponent].board;

    if (opponentBoard[x][y] === "hit" || opponentBoard[x][y] === "miss") {
      socket.emit("error", "This spot has already been targeted.");
      return;
    }

    const isHit = opponentBoard[x][y] === "ship";
    opponentBoard[x][y] = isHit ? "hit" : "miss";

    if (isHit) {
      players[socket.id].hits.push({ x, y });
    }

    io.to(socket.id).emit("move-result", {
      x,
      y,
      result: isHit ? "hit" : "miss",
    });
    io.to(opponent).emit("opponent-move", {
      x,
      y,
      result: isHit ? "hit" : "miss",
    });

    const allShipsSunk =
      opponentBoard.flat().filter((cell) => cell === "ship").length === 0;
    if (allShipsSunk) {
      io.to(socket.id).emit("game-over", { result: "win" });
      io.to(opponent).emit("game-over", { result: "lose" });

      delete games[gameId];
      players[socket.id].status = "waiting";
      players[opponent].status = "waiting";
      return;
    }

    game.turn = opponent;
  });
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    const opponentId = players[socket.id]?.opponent;
    if (opponentId) {
      io.to(opponentId).emit("opponent-disconnected");
      players[opponentId].status = "waiting"; // Reset opponent status
    }
    delete players[socket.id];
    io.emit("player-count", Object.keys(players).length);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
