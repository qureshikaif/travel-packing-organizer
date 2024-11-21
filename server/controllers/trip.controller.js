import Trip from '../models/trip.js';

export const createTrip = async (req, res) => {
  const { name, type, userId } = req.body;
  try {
    const trip = await Trip.create({ name, type, user: userId });
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
