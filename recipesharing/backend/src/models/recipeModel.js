import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
    },
    description: {
      type: String,
      required: [true, "Recipe description is required"],
    },
    ingredients: {
      type: [String], // Array of ingredient strings
      required: [true, "Ingredients are required"],
    },
    steps: {
      type: [String], // Array of steps
      required: [true, "Recipe steps are required"],
    },
    labels: {
      type: [String], // Tags or labels for filtering
      default: [],
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Chef is required"],
    },
    image: {
      type: String, // URL or path to the uploaded image
      default: "default.jpg",
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
