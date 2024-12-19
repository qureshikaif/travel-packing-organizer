// controllers/reminderController.js

import Reminder from "../models/reminder.js";

// @desc    Create a new reminder
// @route   POST /api/reminders
// @access  Private
export const createReminder = async (req, res, next) => {
  try {
    const { item, timeBefore } = req.body;

    const reminder = new Reminder({
      item,
      timeBefore,
      user: req.user.id,
    });

    await reminder.save();

    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reminders for the user
// @route   GET /api/reminders
// @access  Private
export const getReminders = async (req, res, next) => {
  const user = req.params.id;
  try {
    const reminders = await Reminder.find({ user });
    res.status(200).json(reminders);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
// @access  Private
export const deleteReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found." });
    }

    // Check if the reminder belongs to the user
    if (reminder.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this reminder." });
    }

    await reminder.remove();

    res.status(200).json({ message: "Reminder removed." });
  } catch (error) {
    next(error);
  }
};
