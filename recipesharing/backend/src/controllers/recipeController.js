import { Recipe } from "../models/recipeModel.js";
import path from "path";
import { resizeImage } from "../utils/resizeImage.js";

export const getRecipes = async (req, res) => {
  try {
    const { keyword, labels, chef, page = 1, limit = 10 } = req.query;

    const query = {};
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    if (labels) query.labels = { $in: labels.split(",") };
    if (chef) query.chef = chef;

    const recipes = await Recipe.find(query)
      .populate("chef", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments(query);

    res.status(200).json({
      success: true,
      data: recipes,
      pagination: {
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    if (recipe.chef.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ error: "Unauthorized to update this recipe" });

    Object.assign(recipe, req.body); // Merge updates
    await recipe.save();

    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "chef",
      "name"
    );
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, labels } = req.body;

    let image = null;
    if (req.file) {
      const resizedPath = await resizeImage(
        req.file.path,
        `${Date.now()}-recipe.jpeg`
      );
      image = path.basename(resizedPath); // Save only the filename
    }
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      labels,
      chef: req.user._id, 
      image,
    });

    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    if (recipe.chef.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this recipe" });

    await recipe.remove();

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
