import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ item: String, packed: Boolean }],
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('List', listSchema);
