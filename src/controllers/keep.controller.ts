import { Request, Response } from 'express';
import Keep from '../models/Keep.model';
import { AuthenticatedRequest } from './taskController.controller';

// Create new Keep entry
export const createKeep = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user email found' });
    }

    const newKeep = await Keep.create({
      ...req.body,
      userEmail, // attach logged-in user's email
    });

    res.status(201).json(newKeep);
  } catch (error: any) {
    console.error('Create Keep error:', error);
    res.status(400).json({ error: error.message || 'Something went wrong' });
  }
};

// Get all Keep entries
export const getAllKeeps = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user email found' });
    }

    const keeps = await Keep.find({ userEmail }).sort({ createdAt: -1 });
    res.json(keeps);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Get Keep entry by ID
export const getKeepById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;
    const keep = await Keep.findOne({ _id: req.params.id, userEmail });

    if (!userEmail) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: No user email found' });
    }

    if (!keep) {
      return res.status(404).json({ error: 'Keep not found' });
    }

    res.json(keep);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Update Keep entry by ID
export const updateKeep = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: No user email found' });
    }

    const updatedKeep = await Keep.findOneAndUpdate(
      { _id: req.params.id, userEmail },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedKeep) {
      return res
        .status(404)
        .json({ error: 'Keep not found or not authorized' });
    }

    res.json(updatedKeep);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Update failed' });
  }
};

// Delete Keep entry by ID
export const deleteKeep = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: No user email found' });
    }

    const deletedKeep = await Keep.findOneAndDelete({
      _id: req.params.id,
      userEmail,
    });

    if (!deletedKeep) {
      return res
        .status(404)
        .json({ error: 'Keep not found or not authorized' });
    }

    res.json({ message: 'Keep deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Delete failed' });
  }
};
