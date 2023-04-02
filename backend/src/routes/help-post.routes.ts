import Express from 'express';

const router = Express.Router();
import {
  getAllHelpPost,
  getHelpPostById,
  createHelpPost,
  updatehelpPost,
  deleteHelpPost,
} from '../controllers/help-post.controller';
import fileUpload from 'express-fileupload';

import commentRouter from './comment.routes';

router
  .route('/')
  .get(getAllHelpPost)
  .post(fileUpload({ createParentPath: true }), createHelpPost);

router
  .route('/:id')
  .patch(updatehelpPost)
  .delete(deleteHelpPost)
  .get(getHelpPostById);

router.use('/:id/comments', commentRouter);

export default router;
