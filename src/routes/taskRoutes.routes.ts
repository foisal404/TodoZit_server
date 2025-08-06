import express, { RequestHandler } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.controller';

const router = express.Router();

router.post('/', createTask as RequestHandler);
router.get('/', getTasks as RequestHandler);
router.get('/:id', getTaskById as RequestHandler);
router.put('/:id', updateTask as RequestHandler);
router.delete('/:id', deleteTask as RequestHandler);

export default router;
