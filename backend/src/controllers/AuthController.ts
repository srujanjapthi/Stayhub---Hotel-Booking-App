import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response) => {
  res.status(200).json({
    userId: req.userId,
  });
};

const loginCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid Credentials",
      });

      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.send(400).json({
        message: "Invalid Credentials",
      });

      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" },
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 85400000,
    });

    res.status(200).json({
      userId: user._id,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const logoutCurrentUser = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  res.send();
};

export default {
  validateToken,
  loginCurrentUser,
  logoutCurrentUser,
};
