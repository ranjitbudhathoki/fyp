import { Router } from 'express';
const router = Router();

import {
  getAllMatchPost,
  getMatchPostById,
  createMatchPost,
  deleteMatchPost,
  updateMatchPost,
} from '../controllers/match-post.controller';

router.route('/').get(getAllMatchPost).post(createMatchPost);

router
  .route('/:id')
  .patch(updateMatchPost)
  .delete(deleteMatchPost)
  .get(getMatchPostById);

router.route('/:id/comments').post().get();

export default router;
