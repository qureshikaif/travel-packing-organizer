import express from 'express';
import { createTrip } from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/', createTrip);

export default router;
