// routes/gearListRoutes.js

import express from "express";
import {
  getGearList,
  addGearItem,
  removeGearItem,
  toggleGearItem,
} from "../controllers/gear-list.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// @route   GET /api/gearlists
// @desc    Get user's gear list
// @access  Private
router.get("/:id", authMiddleware, getGearList);

// @route   POST /api/gearlists
// @desc    Add a new gear item
// @access  Private
router.post("/", authMiddleware, addGearItem);

// @route   DELETE /api/gearlists/:id
// @desc    Remove a gear item
// @access  Private
router.delete("/:id", authMiddleware, removeGearItem);

// @route   PUT /api/gearlists/:id/toggle
// @desc    Toggle packed status of a gear item
// @access  Private
router.put("/:id/toggle", authMiddleware, toggleGearItem);

export default router;
