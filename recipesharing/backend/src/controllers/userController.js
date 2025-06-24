import { User } from "../models/userModel.js";
import { Recipe } from "../models/recipeModel.js";
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user._id.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile" });

    Object.assign(user, req.body); // Merge updates
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipesByChef = async (req, res) => {
  try {
    const recipes = await Recipe.find({ chef: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
