// models/GroupPackingList.js

import mongoose from 'mongoose';

const GroupPackingListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    members: [
      {
        type: String,
        required: true,
        maxlength: 50,
      },
    ],
    items: [
      {
        type: String,
        required: true,
        maxlength: 100,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const GroupPackingList = mongoose.model('GroupPackingList', GroupPackingListSchema);

export default GroupPackingList;
