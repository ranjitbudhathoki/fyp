import { Router } from 'express';
import {
  saveSolution,
  getSolution,
  deleteSoltion,
} from '../controllers/solution.controller';
const router = Router();

router.post('/', saveSolution);
router.get('/:postId', getSolution);
router.delete('/:id', deleteSoltion);

export default router;
