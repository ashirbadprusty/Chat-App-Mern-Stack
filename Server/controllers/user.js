import { User } from '../models/user.js';
import { sendToken } from '../utils/features.js';

export const newUser = async (req, res) => {
  const {name, username, password, bio} = req.body;

  const avatar = {
    public_id: "ashirbad",
    url: "ashirbad",
  };
  try {
    const user = await User.create({
      name ,
      bio,        
      username,
      password,
      avatar,
    });

    sendToken(res,user, 201, "User Created");

  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

export const login = (req, res) => {
  res.send("Hello World");
};
