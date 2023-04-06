import { Router } from 'express';
import { saveSolution, getSolution } from '../controllers/solution.controller';
const router = Router();

router.post('/', saveSolution);
router.get('/:postId', getSolution);

export default router;
