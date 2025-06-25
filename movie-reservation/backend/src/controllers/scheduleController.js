import Schedule from "../models/scheduleModel.js";

export const createSchedule = async (req, res) => {
  try {
    const { movieId, screenId, showtimes } = req.body;
    const schedule = await Schedule.create({ movieId, screenId, showtimes });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error });
  }
};

export const getSchedulesByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const schedules = await Schedule.find({ movieId }).populate("screenId");
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};
