// routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return JWT
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get('/me', authMiddleware, getCurrentUser);

export default router;
