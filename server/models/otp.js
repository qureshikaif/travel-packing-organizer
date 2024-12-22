import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/, // Validate email format
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // Expires after 10 minutes
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
