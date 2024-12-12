// routes/groupPackingRoutes.js

import express from 'express';
import {
    createGroupPackingList,
    getGroupPackingLists,
    getGroupPackingListById,
    updateGroupPackingList,
    deleteGroupPackingList,
} from '../controllers/group-packing.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   POST /api/grouppacking
// @desc    Create a new group packing list
// @access  Private
router.post('/', authMiddleware, createGroupPackingList);

// @route   GET /api/grouppacking
// @desc    Get all group packing lists for the user
// @access  Private
router.get('/', authMiddleware, getGroupPackingLists);

// @route   GET /api/grouppacking/:id
// @desc    Get a single group packing list by ID
// @access  Private
router.get('/:id', authMiddleware, getGroupPackingListById);

// @route   PUT /api/grouppacking/:id
// @desc    Update a group packing list
// @access  Private
router.put('/:id', authMiddleware, updateGroupPackingList);

// @route   DELETE /api/grouppacking/:id
// @desc    Delete a group packing list
// @access  Private
router.delete('/:id', authMiddleware, deleteGroupPackingList);

export default router;
