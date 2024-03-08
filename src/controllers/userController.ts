import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import dotenv from 'dotenv';
import {ses} from '../config/awsConfig';
import { logger } from "../config/logging";
import { sendVerificationEmail } from "../services/emailServices";
dotenv.config();

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

    await sendVerificationEmail(email);
    res.json({ token });
  } catch (error) {
    console.log(error)
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

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const accessToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '10s'});
    res.json({ accessToken });
  } catch (error) {
    logger.error(`Error while generating refresh token ${error}`);
    res.sendStatus().json({ message: 'error while generating refresh token'});
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = jwt.sign({ userId: user._id}, process.env.RESET_SECRET_KEY, { expiresIn: '1h'});
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: { Data: `To reset your password, click on the following link: http://localhost:8900/reset-password:${resetToken}` },
        },
        Subject: { Data: 'Password Reset Request' },
      },
      Source: 'developerankit2127@gmail.com',
    };

    await ses.sendEmail(params).promise()
    res.json({ message: 'Password reset email sent !'})
  } catch (error) {
    logger.error(`Error while reset password ${error}`)
    console.log(error)
    res.status(500).json({ message: 'Error in reset password' });
  }
}


export const resetPasswordReq = async(req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.RESET_SECRET_KEY);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if(!user) {
      res.sendStatus(301).json({ message: 'User not found'});
    }

    user.password = password;
    await user.save();

    res.sendStatus(201).json({ message: 'password reset successfully'});
  } catch (error) {
    logger.error(`Error while setting new password ${error}`);
  }
}

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    // Verify the token
    const decoded = jwt.verify(token, process.env.VERIFICATION_SECRET_KEY) as { email: string };
    const userEmail = decoded.email;

    // Find the user with the provided email
    const user = await User.findOne({ email: userEmail });

    // If the user doesn't exist or email is already verified, return an error
    if (!user || user.emailVerified === true) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Mark the user's email as verified
    user.emailVerified = true;
    await user.save();

    // Redirect the user to a success page or send a success response
    res.redirect('/email-verified');
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const emailVerified = ( req: Request, res: Response) => {
  try{
    res.render('emailVerified', { message: 'Your email has been successfully verified.' });
  }catch(error){
    logger.error(`Error in redirecting verified email page`)
    res.sendStatus(301).json({ message: 'Error in redirecting to email page'})
  }
}