import { Theater } from "../models/theaterModel.js";
import { Schedule } from "../models/scheduleModel.js";
import { Movie } from "../models/movieModal.js";
export const getTheatersAndMoviesByCity = async (req, res) => {
  const { city } = req.query;

  try {
    // Fetch theaters in the specified city
    const theaters = await Theater.find({ city }).populate("screens");

    // Collect movie IDs from schedules associated with these theaters
    const schedules = await Schedule.find({
      screenId: {
        $in: theaters.flatMap((theater) =>
          theater.screens.map((screen) => screen.screenId)
        ),
      },
    });

    const movieIds = [
      ...new Set(schedules.map((schedule) => schedule.movieId)),
    ];

    // Fetch movies by IDs
    const movies = await Movie.find({ _id: { $in: movieIds } });

    res.status(200).json({
      theaters,
      movies,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching theaters and movies", error });
  }
};