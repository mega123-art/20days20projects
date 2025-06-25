import { Movie } from "../models/movieModal.js";
export const createMovie = async (req, res) => {
  try {
    const { title, genre, duration, releaseDate, cast } = req.body;
    const movie = await Movie.create({
      title,
      genre,
      duration,
      releaseDate,
      cast,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error creating movie", error });
  }
};
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};
