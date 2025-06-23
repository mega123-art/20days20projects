import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
      min: [1, "duration must be at least 1 minute"],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    exercises: [exerciseSchema], // Embedded exercises
    completed: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
      default: "",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const Workout = mongoose.model("Workout", workoutSchema);
