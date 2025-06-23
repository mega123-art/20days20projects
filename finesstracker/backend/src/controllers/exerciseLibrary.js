import { ExerciseLibrary } from "../models/exerciseLibraryModel.js";
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await ExerciseLibrary.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
export const addExercise = async (req, res) => {
  const { name, description, muscleGroup, defaultDuration } = req.body;

  try {
    const exerciseExists = await ExerciseLibrary.findOne({ name });

    if (exerciseExists) {
      return res.status(400).json({ message: "Exercise already exists" });
    }

    const exercise = await ExerciseLibrary.create({
      name,
      description,
      muscleGroup,
      defaultDuration,
    });

    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { name, description, muscleGroup, defaultDuration } = req.body;

  try {
    const exercise = await ExerciseLibrary.findById(id);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    exercise.name = name || exercise.name;
    exercise.description = description || exercise.description;
    exercise.muscleGroup = muscleGroup || exercise.muscleGroup;
    exercise.defaultDuration =
      defaultDuration !== undefined
        ? defaultDuration
        : exercise.defaultDuration;

    const updatedExercise = await exercise.save();
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await ExerciseLibrary.findById(id);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    await exercise.remove();
    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};