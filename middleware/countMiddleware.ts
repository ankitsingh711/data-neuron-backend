import { Request, Response, NextFunction } from 'express';
import Counters from '../model/counterModel';

export const incrementAddCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Counters.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { upsert: true });
    next();
  } catch (err) {
    console.error("Error incrementing add count", err);
    res.status(500).json({ error: "Error incrementing add count" });
  }
};

export const incrementUpdateCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Counters.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { upsert: true });
    next();
  } catch (err) {
    console.error("Error incrementing update count", err);
    res.status(500).json({ error: "Error incrementing update count" });
  }
};
