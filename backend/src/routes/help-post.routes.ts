import Express from 'express';

const router = Express.Router();
import {
  getAllHelpPost,
  getHelpPostById,
  createHelpPost,
  updatehelpPost,
  deleteHelpPost,
  createComment,
  handleLikeUpdate,
} from '../controllers/help-post.controller';

import commentRouter from './comment.routes';
router.route('/').get(getAllHelpPost).post(createHelpPost);

router
  .route('/:id')
  .patch(updatehelpPost)
  .delete(deleteHelpPost)
  .get(getHelpPostById);

router.use('/:id/comments', commentRouter);

// router.route('/:id/comments').post(createComment).get(handleLikeUpdate);

export default router;
