import { User } from "../models/user.js";
export const getOnlineUsers = async (req, res) => {
  try {
    const onlineUsers = await User.find({ isOnline: true }, "username email");
    res.status(200).json(onlineUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch online users" });
  }
};