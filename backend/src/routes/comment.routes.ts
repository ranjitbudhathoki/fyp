import { Router } from 'express';
import {
  createComment,
  updateComment,
  getCommentLike,
  handleLikeUpdate,
  deleteComment,
} from '../controllers/comment.controller';
const router = Router({ mergeParams: true });

router.route('/').post(createComment);

router.route('/:id').patch(updateComment).delete(deleteComment);

router.route('/:commentId/likes').get(getCommentLike).post(handleLikeUpdate);

export default router;
