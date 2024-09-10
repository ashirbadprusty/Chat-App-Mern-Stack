import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './utils/features.js';

import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';

import chatRoute from './routes/chat.js';
import userRoute from './routes/user.js';
import adminRoute from './routes/admin.js';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB(mongoURI);
    console.log('Database connected successfully');


    const app = express();

    // Middleware to parse JSON bodies
    app.use(express.json());
    app.use(cookieParser());
    // Routes
    app.use('/user', userRoute);
    app.use('/chat', chatRoute);
    app.use('/admin', adminRoute);
    app.get('/', (req,res)=>{
      res.send('Welcome to the Server');
    });

    // Catch-all route for handling 404 errors
    app.use((req, res, next) => {
      res.status(404).json({ message: 'Route not found' });
    });

    // Error handling middleware
    app.use(errorMiddleware);
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();
