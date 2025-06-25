import { Theater } from "../models/theaterModel.js";
import { Screen } from "../models/screenModel.js";

export const createTheater = async (req, res) => {
  try {
    const { name, location } = req.body;
    const theater = await Theater.create({ name, location, screens: [] });
    res.status(201).json(theater);
  } catch (error) {
    res.status(500).json({ message: "Error creating theater", error });
  }
};

export const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find().populate("screens");
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching theaters", error });
  }
};

export const addScreenToTheater = async (req, res) => {
  const { theaterId } = req.params;
  const { name, totalSeats, seatLayout } = req.body;

  try {
    const theater = await Theater.findById(theaterId);
    if (!theater) return res.status(404).json({ message: "Theater not found" });

    const screen = await Screen.create({
      name,
      theaterId,
      totalSeats,
      seatLayout,
    });

    theater.screens.push(screen._id);
    await theater.save();

    res.status(201).json(screen);
  } catch (error) {
    res.status(500).json({ message: "Error adding screen", error });
  }
};