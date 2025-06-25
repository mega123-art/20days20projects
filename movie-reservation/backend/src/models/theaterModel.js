import mongoose from "mongoose";
const audiSchema = new mongoose.Schema({});

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  screens: [
    { screenId: { type: mongoose.Schema.Types.ObjectId, ref: "Screen" } },
  ],
});

export const Theater= mongoose.model("Theater", theaterSchema);
