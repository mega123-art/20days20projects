import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();
router.post("/", createRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurant);
export default router;
