import Express from "express";

const router = Express.Router();
import {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

router.route("/").get(getAllPost).post(createPost);

router.route("/id").patch(updatePost).delete(deletePost);

export default router;
