import { Task } from "../models/taskmodel.js";


export const createTask = async (req, res) => {
  try {
    const { description, status, dueDate, category, priority } = req.body;
    const task = await Task.create({
      description,
      status,
      dueDate,
      category,
      priority,
      user: req.userId,
    });
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = { user: req.userId };
    if (status) filter.status = status;
    if (category) filter.category = category;
    const tasks = await Task.find(filter).populate("category");
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
