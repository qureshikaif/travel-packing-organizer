// models/GearItem.js

import mongoose from "mongoose";

const GearItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  packed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const GearItem = mongoose.model('GearItem', GearItemSchema);

export default GearItem;

