// src/models/restaurant.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String, 
      required: true,
    },
    rating: {
      type: Number,
      default: 0, 
    },
    reviewCount: {
      type: Number,
      default: 0, 
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
