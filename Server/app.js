import express from 'express';
import { connectDB } from './utils/features.js';
import userRoute from './routes/user.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env',
})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();
// Middleware to parse JSON bodies
app.use(express.json()); 


app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
