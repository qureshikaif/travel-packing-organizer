import express from 'express';
import { createList } from '../controllers/list.controller.js';

const router = express.Router();

router.post('/', createList);

export default router;
