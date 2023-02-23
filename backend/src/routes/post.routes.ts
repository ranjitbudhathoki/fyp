import Express from 'express';

const router = Express.Router();
import {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from '../controllers/post.controller';

router.route('/').get(getAllPost).post(createPost);

router.route('/:id').patch(updatePost).delete(deletePost).get(getPostById);

router.route('/:id/comments').post().get();

export default router;
