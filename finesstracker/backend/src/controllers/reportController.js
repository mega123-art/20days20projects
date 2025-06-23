import { Workout } from "../models/workoutModel.js";
export const getWorkoutReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Validate date range
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Please provide both startDate and endDate" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Query workouts in the given date range
    const workouts = await Workout.find({
      user: req.user._id,
      date: { $gte: start, $lte: end },
    });

    // Calculate completed and total workouts
    const totalWorkouts = workouts.length;
    const completedWorkouts = workouts.filter(
      (workout) => workout.completed
    ).length;

    const completionRate =
      totalWorkouts > 0
        ? ((completedWorkouts / totalWorkouts) * 100).toFixed(2)
        : 0;

    res.status(200).json({
      totalWorkouts,
      completedWorkouts,
      completionRate,
      workouts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
