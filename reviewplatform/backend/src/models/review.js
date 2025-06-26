import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    sentimentScore: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
reviewSchema.post("save", async function () {
  const Restaurant = mongoose.model("Restaurant");
  const reviews = await this.constructor.find({
    restaurantId: this.restaurantId,
  });

  const reviewCount = reviews.length;
  const rating =
    reviews.reduce((sum, review) => sum + review.sentimentScore, 0) /
    reviewCount;

  await Restaurant.findByIdAndUpdate(this.restaurantId, {
    reviewCount,
    rating,
  });
});
const Review = mongoose.model("Review", reviewSchema);
export default Review;
