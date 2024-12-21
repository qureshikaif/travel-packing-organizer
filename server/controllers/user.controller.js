import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
