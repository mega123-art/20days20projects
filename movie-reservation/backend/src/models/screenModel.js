import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Screen 1", "Dolby Cinema"
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true,
  },
  totalSeats: { type: Number, required: true },
  seatLayout: [
    {
      row: { type: String }, // e.g., "A"
      seats: [
        {
          seatNumber: { type: String }, // e.g., "A1"
          status: {
            type: String,
            enum: ["available", "booked"],
            default: "available",
          },
        },
      ],
    },
  ],
});

export const Screen=mongoose.model("Screen", screenSchema);
