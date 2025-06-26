import Review from "../models/review.js";
import { analyzeSentiment } from "../services/nlpService.js";
import { updateLeaderboard } from "../services/leaderboardService.js";
export const createReview = async (req, res) => {
  try {
    const { restaurantId, user, comment } = req.body;
    const sentimentScore = analyzeSentiment(comment);

    const review = new Review({ restaurantId, user, comment, sentimentScore });
    await review.save();

    await updateLeaderboard(restaurantId,sentimentScore)

    res.status(201).json({ message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurantId });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  