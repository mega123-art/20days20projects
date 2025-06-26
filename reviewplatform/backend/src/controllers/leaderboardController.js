import { getTopRestaurants } from "../services/leaderboardService.js";
export const getLeaderboard = async (req, res) => {
  try {
    const count = parseInt(req.query.count, 10) || 10; // Default to top 10
    const leaderboard = await getTopRestaurants(count);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};