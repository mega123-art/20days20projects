import express from "express";
import {
  createReservation,
  getUserReservations,
} from "../controllers/reservationController.js";
const router = express.Router();
router.post("/", createReservation);
router.get("/user/:userId", getUserReservations);
export default router;
