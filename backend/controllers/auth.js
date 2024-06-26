import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10,"a");
    const passwordHash = await bcrypt.hash(password, salt); //incrypting the password into hash password

    const localpicturepath=req.file.path
    // console.log(localpicturepath)
    // console.log(req.file)
const picture=await uploadOnCloudinary(localpicturepath)
console.log(picture.url)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath:picture.url,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impression: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save(); //will save the newuser into database
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(403).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
