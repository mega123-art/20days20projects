import Restaurant from "../models/restaurant.js";
export const createRestaurant = async (req, res) => {
  try {
    const { name, location, category } = req.body;

    const restaurant = new Restaurant({ name, location, category });
    await restaurant.save();

    res.status(201).json({ message: "Restaurant created", restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};