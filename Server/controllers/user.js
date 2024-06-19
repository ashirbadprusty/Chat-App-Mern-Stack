import { User } from '../models/user.js';

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

    res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

export const login = (req, res) => {
  res.send("Hello World");
};
