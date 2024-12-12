// models/Reminder.js

import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      maxlength: 100,
    },
    timeBefore: {
      type: String,
      enum: ['1 day', '2 days', '1 week'],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model('Reminder', ReminderSchema);

export default Reminder;
