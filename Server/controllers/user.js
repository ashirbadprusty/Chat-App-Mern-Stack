import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "ashirbad",
    url: "ashirbad",
  };
  try {
    const user = await User.create({
      name,
      bio,
      username,
      password,
      avatar,
    });

    sendToken(res, user, 201, "User Created");
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

const login = TryCatch(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid Username or Password", 404));
    const isMatch = await compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid Username or Password", 404));
    sendToken(res, user, 200, `Welcome Back ${user.name}`);
  } catch (error) {
    next(error);
  }
});

const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: "req.user",
  });
};

export { login, newUser, getMyProfile };
