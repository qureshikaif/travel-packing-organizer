// controllers/authController.js

import OTP from "../models/otp.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTPByEmail } from "../utils/notifications.js";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Create user
    user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user and return JWT
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Send OTP for forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const sendForgotPasswordOTP = async (req, res, next) => {
  const otp = generateOTP();
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    // Save OTP in the database
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      await OTP.findOneAndUpdate({ email }, { otp, createdAt: Date.now() });
    } else {
      await OTP.create({ email, otp });
    }

    // Send OTP via email
    await sendOTPByEmail(email, otp);

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP and reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const verifyOTPAndResetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check OTP
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Update user password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = newPassword; // Ensure password hashing in the User model
    await user.save();

    // Delete OTP record after successful reset
    await OTP.deleteOne({ email });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    next(error);
  }
};
