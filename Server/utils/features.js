import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      dbName: "ChatApp",
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

  

  return res.status(code).cookie("ChatApp-token", token, cookieOption).json({
    success: true,

    message,
  });
};

export { connectDB, sendToken };
