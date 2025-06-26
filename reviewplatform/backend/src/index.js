import app from "./app.js";
import connectDB from "./config/db.js";
import redisClient from "./config/redis.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(); // Connect to MongoDB
    await redisClient; // Initialize Redis
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
})();