import { Router } from 'express';
import { createMatch } from '../controllers/match-post.controller';
import {
  getAllMatchForUser,
  getMessages,
  createMessage,
} from '../controllers/chat.controller';
const router = Router();

router.route('/').post(createMatch);

router.get('/:userId', getAllMatchForUser);
router.get('/:matchId/messages', getMessages);
router.post('/:matchId/messages', createMessage);
export default router;
