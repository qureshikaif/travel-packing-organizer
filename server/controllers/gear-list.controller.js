// controllers/gearListController.js

import GearItem from "../models/gear-item.js";

// @desc    Get user's gear list
// @route   GET /api/gearlists
// @access  Private
export const getGearList = async (req, res, next) => {
  try {
    const gearList = await GearItem.find({ user: req.params.id });
    res.status(200).json(gearList);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new gear item
// @route   POST /api/gearlists
// @access  Private
export const addGearItem = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Check if item already exists
    const existingItem = await GearItem.findOne({ name, user: req.user.id });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Gear item already exists in your list." });
    }

    const gearItem = new GearItem({
      name,
      user: req.user.id,
    });

    await gearItem.save();

    res.status(201).json(gearItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a gear item
// @route   DELETE /api/gearlists/:id
// @access  Private
export const removeGearItem = async (req, res, next) => {
  try {
    const gearItem = await GearItem.findById(req.params.id);

    if (!gearItem) {
      return res.status(404).json({ message: "Gear item not found." });
    }

    if (gearItem.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to remove this gear item." });
    }

    await GearItem.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Gear item removed." });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle packed status of a gear item
// @route   PUT /api/gearlists/:id/toggle
// @access  Private
export const toggleGearItem = async (req, res, next) => {
  try {
    const gearItem = await GearItem.findById(req.params.id);
    if (!gearItem) {
      return res.status(404).json({ message: "Gear item not found." });
    }

    // Check if the item belongs to the user
    if (gearItem.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this gear item." });
    }

    gearItem.packed = !gearItem.packed;
    await gearItem.save();

    res.status(200).json(gearItem);
  } catch (error) {
    next(error);
  }
};
