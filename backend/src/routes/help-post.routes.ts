import Express from 'express';

const router = Express.Router();
import {
  getAllHelpPost,
  getHelpPostById,
  createHelpPost,
  updatehelpPost,
  deleteHelpPost,
  createComment,
} from '../controllers/help-post.controller';

router.route('/').get(getAllHelpPost).post(createHelpPost);

router
  .route('/:id')
  .patch(updatehelpPost)
  .delete(deleteHelpPost)
  .get(getHelpPostById);

router.route('/:id/comments').post(createComment);

export default router;
