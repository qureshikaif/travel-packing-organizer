// routes/reminderRoutes.js

import express from "express";
import {
  createReminder,
  getReminders,
  deleteReminder,
} from "../controllers/reminder.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// @route   POST /api/reminders
// @desc    Create a new reminder
// @access  Private
router.post("/", authMiddleware, createReminder);

// @route   GET /api/reminders
// @desc    Get all reminders for the user
// @access  Private
router.get("/:id", authMiddleware, getReminders);

// @route   DELETE /api/reminders/:id
// @desc    Delete a reminder
// @access  Private
router.delete("/:id", authMiddleware, deleteReminder);

export default router;
