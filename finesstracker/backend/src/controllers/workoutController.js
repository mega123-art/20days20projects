import { Workout } from "../models/workoutModel.js"
;
export const createWorkout = async (req, res) => {
  const { date, exercises } = req.body;

  try {
    const workout = await Workout.create({
      user: req.user._id, // User from the protect middleware
      date,
      exercises,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort("date");
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { date, exercises, completed } = req.body;

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    workout.date = date || workout.date;
    workout.exercises = exercises || workout.exercises;
    workout.completed = completed !== undefined ? completed : workout.completed;

    const updatedWorkout = await workout.save();
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await workout.remove();
    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addWorkoutComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    workout.comments = comment || workout.comments;
    const updatedWorkout = await workout.save();

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExerciseNotes = async (req, res) => {
  const { id, exerciseIndex } = req.params;
  const { notes } = req.body;

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!workout.exercises[exerciseIndex]) {
      return res
        .status(404)
        .json({ message: "Exercise not found in the workout" });
    }

    workout.exercises[exerciseIndex].notes = notes || "";
    const updatedWorkout = await workout.save();

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};