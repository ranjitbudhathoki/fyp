import { Router } from 'express';
import {
  saveSolution,
  getSolution,
  deleteSolution,
} from '../controllers/solution.controller';
const router = Router();

router.post('/', saveSolution);
router.get('/:postId', getSolution);
router.delete('/:solutionId', deleteSolution);

export default router;
