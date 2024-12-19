// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import gearPackRoutes from "./routes/gear-pack.route.js";
import gearListRoutes from "./routes/gear-list.route.js";
import reminderRoutes from "./routes/reminder.route.js";
import groupPackingRoutes from "./routes/group-packing.route.js";
import errorHandler from "./middlewares/error.middleware.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gearpacks", gearPackRoutes);
app.use("/api/gearlists", gearListRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/grouppacking", groupPackingRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// For vercel deployment
export default app;
