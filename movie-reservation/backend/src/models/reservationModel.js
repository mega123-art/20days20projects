import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seats: [{ type: String, required: true }], // List of seat numbers
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});

export const Reservation= mongoose.model("Reservation", reservationSchema);
