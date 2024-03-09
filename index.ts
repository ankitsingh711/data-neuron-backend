import express from "express";
import connectDB from "./src/config/database";
import cors from 'cors';
import dataRoutes from './src/routes/dataRoutes';
import userRoutes from './src/routes/userRoutes';
import dotenv from 'dotenv';
import morgan from 'morgan';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import redisClient from "./src/config/redis";
import { GoogleAuthService } from './src/services/googleAuthService';
dotenv.config();
  
const app = express();

// Use morgan middleware for request logging with execution time
app.use(morgan(':method :url :status :response-time ms'));
app.use(responseTime());

// define port or port from .env
const PORT = process.env.PORT || 5000;

// Initialize Passport

GoogleAuthService.configurePassport();


// using cors for cross-origin-resource-policy
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', dataRoutes);
app.use('/', userRoutes);



// listening to the port
app.listen(PORT, async () => {
  try {
    connectDB();
    // redisClient();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(`Error while connecting to Database ${error}`);
  }
});
