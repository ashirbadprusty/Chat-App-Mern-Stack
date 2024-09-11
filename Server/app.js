import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./utils/features.js";

import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ashirbadprusty";
const userSocketIDs = new Map();

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB(mongoURI);
    // console.log('Database connected successfully');

    const app = express();
    const server = createServer(app);
    const io = new Server(server, {});

    // Middleware to parse JSON bodies
    app.use(express.json());
    app.use(cookieParser());
    // Routes
    app.use("/user", userRoute);
    app.use("/chat", chatRoute);
    app.use("/admin", adminRoute);
    app.get("/", (req, res) => {
      res.send("Welcome to the Server");
    });

    // Catch-all route for handling 404 errors
    app.use((req, res, next) => {
      res.status(404).json({ message: "Route not found" });
    });
    io.use((socket, next) => {});

    io.on("connection", (socket) => {
      const user = {
        _id: "akash",
        name: "akash",
      };
      userSocketIDs.set(user._id.toString(), socket.id);
      console.log("a user connected", socket.id);

      socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        const messageForRealTime = {
          content: message,
          _id: uuid(),
          sender: {
            _id: user._id,
            name: user.name,
          },
          chat: chatId,
          createdAt: new Date().toISOString(),
        };

        const messageForDB = {
          content: message,
          sender: user._id,
          chat: chatId,
        };
        const membersSockets = getSockets(members);
        io.to(membersSockets).emit(NEW_MESSAGE, {
          chatId,
          message: messageForRealTime,
        });
        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
          await Message.create(messageForDB);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        userSocketIDs.delete(user._id.toString());
      });
    });

    // Error handling middleware
    app.use(errorMiddleware);
    // Start the server
    server.listen(port, () => {
      console.log(`Server is running on port ${port} in ${envMode} Mode`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export { adminSecretKey, envMode, userSocketIDs };
