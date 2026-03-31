import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });

    const token = createToken(user._id);
    res.status(201).json({ user: { id: user._id, username: user.username }, token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login Attempt:", username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ error: 'Character not found!' });
    }

    const isMatch = await user.comparePassword(password);
    console.log("Do passwords match?", isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    const token = createToken(user._id);
    res.status(200).json({ user: { id: user._id, username: user.username }, token });
  } catch(err) {
    res.status(500).json({ error: 'The Gatekeeper is having trouble. Try again!' });
  }
};