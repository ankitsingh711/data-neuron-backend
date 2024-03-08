import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import log4js from "log4js";
const logger = log4js.getLogger();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401).json({ message: 'Token expired or invalid'});

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (error) {
    logger.error(error);
  }
};
