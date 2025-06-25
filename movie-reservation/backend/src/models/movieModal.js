import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }, 
  releaseDate: { type: Date, required: true },
  cast: [{ type: String }], 
});

export const Movie= mongoose.model("Movie", movieSchema);
