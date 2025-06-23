import mongoose from "mongoose";

const exerciseLibrarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Exercise name is required"],
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    muscleGroup: {
      type: String,
      required: [true, "Muscle group is required"],
    },
    defaultDuration: {
      type: Number, // Default duration in minutes
      default: 10,
    },
  },
  { timestamps: true }
);

export const ExerciseLibrary = mongoose.model(
  "ExerciseLibrary",
  exerciseLibrarySchema
);

