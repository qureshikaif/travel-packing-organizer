// models/GearPack.js

import mongoose from 'mongoose';

const GearPackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  items: [{
    type: String,
    required: true,
    maxlength: 100,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const GearPack = mongoose.model('GearPack', GearPackSchema);

export default GearPack;
