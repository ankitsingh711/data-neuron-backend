import express from "express";
import connectDB from "./config/database";
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();

// Use morgan middleware for request logging with execution time
app.use(morgan(':method :url :status :response-time ms'));

// define port or port from .env
const PORT = process.env.PORT || 5000;


// using cors for cross-origin-resource-policy
app.use(cors());
app.use(express.json());

app.use('/', dataRoutes);



// listening to the port
app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(`Error while connecting to Database ${error}`);
  }
});
