import dotenv from "dotenv";
import express from "express";
import connectdb from "./db.js";
export const app = express();

const PORT = 3000;
dotenv.config({
  path: "./.env",
});

// Middleware to parse JSON
app.use(express.json());
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
