import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, location, occupation } =
    req.body;


  const picturePath = req.file.filename;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    picturePath,
    location,
    occupation,
    picturePath,
  });


  await user.save();

  

  res.status(200).json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User not registered." });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({ message: "Invalid Credentials." });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.status(200).json({ user: user, token: token });
};
