import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import dotenv from 'dotenv';
dotenv.config();
import log4js from 'log4js';
const logger = log4js.getLogger();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && user.failedLoginAttempts > 2) {
      return res.status(301).json({
        message:
          "You have attempted maximum login attempts. Please try again after 10 mins",
      });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      user.failedLoginAttempts += 1;
      await user.save(); // Save the updated failed login attempts count
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Reset failed login attempts count on successful login
    user.failedLoginAttempts = 0;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10s"});
    res.json({ token });
  } catch (error) {
    logger.error("Error during login:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    console.log(req.body)

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    console.log(hashedPassword)

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY
    );
    res.json({ token });
  } catch (error) {
    logger.error("Error during signup:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const logout = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    logger.error(`Error while logout: `, error);
    res.sendStatus().json({ message: 'problem while logout !'})
  }
}

// export const refreshToken = async (req: Request, res: Response) => {
//   try {
//     const refreshToken = req.body.refreshToken;
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const accessToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '10s'});
//     res.json({ accessToken });
//   } catch (error) {
//     logger.error(`Error while generating refresh token ${error}`);
//     res.sendStatus().json({ message: 'error while generating refresh token'});
//   }
// }