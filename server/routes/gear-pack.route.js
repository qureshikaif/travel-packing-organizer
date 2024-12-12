// routes/gearPackRoutes.js

import express from 'express';
import {
    createGearPack,
    getAllGearPacks,
    getGearPackById,
    updateGearPack,
    deleteGearPack,
} from '../controllers/gear-pack.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   POST /api/gearpacks
// @desc    Create a new gear pack
// @access  Private
router.post('/', authMiddleware, createGearPack);

// @route   GET /api/gearpacks
// @desc    Get all gear packs (predefined and custom)
// @access  Public
router.get('/', getAllGearPacks);

// @route   GET /api/gearpacks/:id
// @desc    Get a single gear pack by ID
// @access  Public
router.get('/:id', getGearPackById);

// @route   PUT /api/gearpacks/:id
// @desc    Update a gear pack
// @access  Private
router.put('/:id', authMiddleware, updateGearPack);

// @route   DELETE /api/gearpacks/:id
// @desc    Delete a gear pack
// @access  Private
router.delete('/:id', authMiddleware, deleteGearPack);

export default router;
