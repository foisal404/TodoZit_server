import express, { RequestHandler } from 'express';
import {
  createKeep,
  getAllKeeps,
  getKeepById,
  updateKeep,
  deleteKeep,
} from '../controllers/keep.controller';

const router = express.Router();

router.post('/', createKeep as RequestHandler);
router.get('/', getAllKeeps as RequestHandler);
router.get('/:id', getKeepById as RequestHandler);
router.put('/:id', updateKeep as RequestHandler);
router.delete('/:id', deleteKeep as RequestHandler);

export default router;
