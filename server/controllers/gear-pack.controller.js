// controllers/gearPackController.js

import GearPack from '../models/gear-pack.js';

// @desc    Create a new gear pack
// @route   POST /api/gearpacks
// @access  Private
export const createGearPack = async (req, res, next) => {
  try {
    const { name, items } = req.body;

    const gearPack = new GearPack({
      name,
      items,
      createdBy: req.user.id,
    });

    await gearPack.save();

    res.status(201).json(gearPack);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all gear packs (predefined and custom)
// @route   GET /api/gearpacks
// @access  Public
export const getAllGearPacks = async (req, res, next) => {
  try {
    const gearPacks = await GearPack.find().populate('createdBy', 'username');
    res.status(200).json(gearPacks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single gear pack by ID
// @route   GET /api/gearpacks/:id
// @access  Public
export const getGearPackById = async (req, res, next) => {
  try {
    const gearPack = await GearPack.findById(req.params.id).populate('createdBy', 'username');
    if (!gearPack) {
      return res.status(404).json({ message: 'Gear pack not found.' });
    }
    res.status(200).json(gearPack);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a gear pack
// @route   PUT /api/gearpacks/:id
// @access  Private
export const updateGearPack = async (req, res, next) => {
  try {
    const gearPack = await GearPack.findById(req.params.id);
    if (!gearPack) {
      return res.status(404).json({ message: 'Gear pack not found.' });
    }

    // Check if the user is the creator
    if (gearPack.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this gear pack.' });
    }

    const { name, items } = req.body;

    if (name) gearPack.name = name;
    if (items) gearPack.items = items;

    await gearPack.save();

    res.status(200).json(gearPack);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a gear pack
// @route   DELETE /api/gearpacks/:id
// @access  Private
export const deleteGearPack = async (req, res, next) => {
  try {
    const gearPack = await GearPack.findById(req.params.id);
    if (!gearPack) {
      return res.status(404).json({ message: 'Gear pack not found.' });
    }

    // Check if the user is the creator
    if (gearPack.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this gear pack.' });
    }

    await gearPack.remove();

    res.status(200).json({ message: 'Gear pack removed.' });
  } catch (error) {
    next(error);
  }
};
