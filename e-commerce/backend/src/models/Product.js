import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: 0,
    },
    image: {
      type: String,
      default: "placeholder-image-url",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
