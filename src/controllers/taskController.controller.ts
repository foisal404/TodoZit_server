import { Request, Response } from 'express';
import Task from '../models/Todo.model';
export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    [key: string]: any;
  };
}

// Create a task
export const createTask = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<Response | undefined> => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      plannedDuration,
      timeSpent,
    } = req.body;

    const userEmail = req.user?.email;

    if (!userEmail) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: user email missing' });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      plannedDuration,
      timeSpent,
      userEmail,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks
export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;
    console.log(userEmail);
    if (!userEmail) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user email found' });
    }

    const tasks = await Task.find({ userEmail });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task by ID
export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userEmail },
      req.body,
      { new: true },
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: 'Task not found or access denied' });
    }

    return res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete task by ID
export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const deletedTask = await Task.findOneAndDelete({ _id: id, userEmail });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: 'Task not found or access denied' });
    }

    return res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
