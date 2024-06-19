import mongoose from "mongoose";

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
export {connectDB}