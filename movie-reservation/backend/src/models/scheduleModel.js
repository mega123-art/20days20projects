import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  showtimes: [
    {
      date: { type: Date, required: true },
      time: { type: String, required: true },
      seats: [
        {
          seatNumber: { type: String, required: true }, // e.g., A1, A2
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
export const Schedule=mongoose.model("Schedule",scheduleSchema)