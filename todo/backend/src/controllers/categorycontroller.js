import { Category } from "../models/categorymodel.js";
export const createcategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name, user: req.user._id });
    res.status(201).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getcategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id }).populate({
        path:"tasks",
        model:"Task",
        match:{user:req.user._id}
    })
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category name
export const updatecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the category and update the name
    const category = await Category.findOneAndUpdate(
      { _id: id, user: req.userId },
      { name },
      { new: true } // Return the updated document
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category and delete it
    const category = await Category.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
