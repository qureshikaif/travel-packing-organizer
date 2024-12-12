// controllers/groupPackingController.js

import GroupPackingList from '../models/group-packing-list.js';

// @desc    Create a new group packing list
// @route   POST /api/grouppacking
// @access  Private
export const createGroupPackingList = async (req, res, next) => {
  try {
    const { name, members, items } = req.body;

    const groupPackingList = new GroupPackingList({
      name,
      members,
      items,
      createdBy: req.user.id,
    });

    await groupPackingList.save();

    res.status(201).json(groupPackingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all group packing lists for the user
// @route   GET /api/grouppacking
// @access  Private
export const getGroupPackingLists = async (req, res, next) => {
  try {
    const groupPackingLists = await GroupPackingList.find({ createdBy: req.user.id });
    res.status(200).json(groupPackingLists);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single group packing list by ID
// @route   GET /api/grouppacking/:id
// @access  Private
export const getGroupPackingListById = async (req, res, next) => {
  try {
    const groupPackingList = await GroupPackingList.findById(req.params.id);
    if (!groupPackingList) {
      return res.status(404).json({ message: 'Group packing list not found.' });
    }

    // Check if the user is the creator
    if (groupPackingList.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to view this group packing list.' });
    }

    res.status(200).json(groupPackingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a group packing list
// @route   PUT /api/grouppacking/:id
// @access  Private
export const updateGroupPackingList = async (req, res, next) => {
  try {
    const groupPackingList = await GroupPackingList.findById(req.params.id);
    if (!groupPackingList) {
      return res.status(404).json({ message: 'Group packing list not found.' });
    }

    // Check if the user is the creator
    if (groupPackingList.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this group packing list.' });
    }

    const { name, members, items } = req.body;

    if (name) groupPackingList.name = name;
    if (members) groupPackingList.members = members;
    if (items) groupPackingList.items = items;

    await groupPackingList.save();

    res.status(200).json(groupPackingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a group packing list
// @route   DELETE /api/grouppacking/:id
// @access  Private
export const deleteGroupPackingList = async (req, res, next) => {
  try {
    const groupPackingList = await GroupPackingList.findById(req.params.id);
    if (!groupPackingList) {
      return res.status(404).json({ message: 'Group packing list not found.' });
    }

    // Check if the user is the creator
    if (groupPackingList.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this group packing list.' });
    }

    await groupPackingList.remove();

    res.status(200).json({ message: 'Group packing list removed.' });
  } catch (error) {
    next(error);
  }
};
