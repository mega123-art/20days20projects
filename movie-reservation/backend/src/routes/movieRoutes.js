import express from "express";
import { getMovies, createMovie } from "../controllers/movieController";
const router = express.Router();
router.post("/", createMovie);
router.get("/", getMovies);
export default router;
