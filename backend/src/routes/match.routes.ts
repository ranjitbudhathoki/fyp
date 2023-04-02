import { Router } from 'express';
import { createMatch } from '../controllers/match-post.controller';
const router = Router();

router.route('/').post(createMatch);
export default router;
