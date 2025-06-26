import redisClient from "../config/redis.js";
export const updateLeaderboard = async (restaurantId, score) => {
  await redisClient.zadd("leaderboard", { score, value: restaurantId });
};
export const getTopRestaurants = async (count) => {
  const leaderboard = await redisClient.zrevrange("leaderboard", 0, count - 1, {
    WITHSCORES: true,
  });

  const result = [];
  for (let i = 0; i < leaderboard.length; i += 2) {
    result.push({
      restaurantId: leaderboard[i],
      score: parseFloat(leaderboard[i + 1]),
    });
  }
  return result;
};