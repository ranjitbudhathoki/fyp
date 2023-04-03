import { Router } from 'express';
import { saveSolution } from '../controllers/solution.controller';
const router = Router();

router.post('/', saveSolution);

export default router;
