import List from '../models/list.js';

export const createList = async (req, res) => {
  const { name, items, tripId, userId } = req.body;
  try {
    const list = await List.create({ name, items, trip: tripId, user: userId });
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
