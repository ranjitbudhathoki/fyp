import Express from 'express';

const router = Express.Router();
import {
  getAllHelpPost,
  getHelpPostById,
  createHelpPost,
  updatehelpPost,
  deleteHelpPost,
  uploadPostImage,
} from '../controllers/help-post.controller';

import commentRouter from './comment.routes';
router.route('/').get(getAllHelpPost).post(uploadPostImage, createHelpPost);

router
  .route('/:id')
  .patch(updatehelpPost)
  .delete(deleteHelpPost)
  .get(getHelpPostById);

router.use('/:id/comments', commentRouter);

export default router;
