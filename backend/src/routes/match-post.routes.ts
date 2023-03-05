import { Router } from 'express';
const router = Router();

import {
  getAllMatchPost,
  getMatchPostById,
  createMatchPost,
  deleteMatchPost,
  updateMatchPost,
  getMatchPostByUserId,
} from '../controllers/match-post.controller';

router.route('/').get(getAllMatchPost).post(createMatchPost);

router
  .route('/:id')
  .patch(updateMatchPost)
  .delete(deleteMatchPost)
  .get(getMatchPostById);

router.route('/:id/comments').post().get();
router.route('/user/:id').get(getMatchPostByUserId);

export default router;

// const express = require("express");
// const fileUpload = require("express-fileupload");
// const {
//   handleAddProduct,
//   getAllProducts,
//   handleDeleteProduct,
//   handleCreateProductComment,
//   getAllProductFromUser,
//   getProductCommentLike,
//   handleCommentLikeUpdate,
//   deleteComment,
//   handleUpdateProductComment,

//   getSingleProduct,
// } = require("../controllers/product.controller");
// const verifyAuth = require("../middlewares/verifyAuth.middleware");
// const productRouter = express.Router();

// productRouter.post(
//   "/addproduct",
//   fileUpload({ createParentPath: true }),
//   verifyAuth,
//   handleAddProduct
// );
// productRouter.post(
//   "/create-product-comment/:userId/:productId",
//   verifyAuth,
//   handleCreateProductComment
// );

// productRouter.patch(
//   `/update-product-comment/:userId/:commentId`,
//   handleUpdateProductComment
// );

// productRouter.get("/get-products", getAllProducts);

// productRouter.get(
//   "/get-product-comment-like/:userId/:productCommentId",
//   getProductCommentLike
// );

// productRouter.get(
//   "/toggle-product-comment-like/:userId/:productCommentId",
//   handleCommentLikeUpdate
// );

// productRouter.delete(
//   "/:productid/:userId/delete-product",
//   verifyAuth,
//   handleDeleteProduct
// );

// productRouter.get(
//   "/:userId/similar-products",
//   verifyAuth,
//   getAllProductFromUser
// );

// productRouter.get("/:productid/get-single-product", getSingleProduct);
// productRouter.delete(
//   "/delete-product-comment/:userId/:commentId",
//   deleteComment
// );

// module.exports = productRouter;
