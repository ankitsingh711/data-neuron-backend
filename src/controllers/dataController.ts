import { Request, Response } from "express";
import Data from "../models/dataModel";
import CounterModel from "../models/counterModel";
import redisClient from "../config/redis";

// Controller function to add new data
export const addData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if there is any existing data
    const existingData = await Data.find({});

    if (existingData.length > 0) {
      // Clear existing data
      await Data.deleteMany({});
    }

    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error("Error adding data", err);
    res.status(500).json({ error: "Error adding data" });
  }
};

// Controller function to update existing data
export const updateData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await Data.findByIdAndUpdate(id, updatedData);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    console.error("Error updating data", err);
    res.status(500).json({ error: "Error updating data" });
  }
};

// Controller function to get count of add/update requests
export const getCount = async (req: Request, res: Response): Promise<void> => {
  const client = await redisClient();
  try {
    const cachedData = await client.get('counters');
    if (cachedData) {
      res.status(200).json(JSON.parse(cachedData));
    } else {
      const counters = await CounterModel.find({});
      await client.set('counters', JSON.stringify(counters));

      res.cookie('test_cookie', JSON.stringify(counters), { httpOnly: true });
      res.status(200).json(counters);
    }
  } catch (err) {
    console.error("Error retrieving counts", err);
    res.status(500).json({ error: "Error retrieving counts" });
  } finally {
    if (client) {
      client.quit();
      console.log('Redis client closed');
    }
  }
};

