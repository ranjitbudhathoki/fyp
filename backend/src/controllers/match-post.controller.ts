import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

const getAllMatchPost = catchAsync(async (req, res, next) => {
  const posts = await prisma.matchPost.findMany({
    where: {
      userId: {
        not: req.user.id,
      },
    },
    include: {
      user: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

const getMatchPostByUserId = catchAsync(async (req, res, next) => {
  const post = await prisma.matchPost.findFirst({
    where: {
      userId: req.params.id,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const getMatchPostById = catchAsync(async (req, res, next) => {
  const post = await prisma.matchPost.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const createMatchPost = catchAsync(async (req, res, next) => {
  const { body } = req.body;

  const post = await prisma.matchPost.create({
    data: {
      body,
      userId: req.user.id,
      updatedAt: new Date(),
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const updateMatchPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.matchPost.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const updatedPost = await prisma.helpPost.update({
    where: {
      id,
    },
    data: {
      ...req.body,
    },
  });

  res.status(204).json({
    status: 'success',
    data: {
      post: updatedPost,
    },
  });
});

const deleteMatchPost = async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.matchPost.findFirst({
    where: { id, userId: req.user.id },
  });

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const deletedPost = await prisma.helpPost.delete({
    where: {
      id,
    },
  });
  res.status(204).json({
    status: 'success',
    data: deletedPost,
  });
};

// const createSolution = catchAsync(req, res, next)=>{
//   const {}
// }

export {
  getAllMatchPost,
  getMatchPostById,
  createMatchPost,
  updateMatchPost,
  deleteMatchPost,
  getMatchPostByUserId,
};

// const getSingleProduct = async (req, res) => {
//   const { productid } = req.params;
//   try {
//     const product = await prisma.product.findUnique({
//       where: { productid },
//       include: {
//         user: {
//           select: {
//             firstName: true,
//             lastName: true,
//             photo: true,
//             email: true,
//             number: true,
//           },
//         },
//         productComments: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });
//     console.log(product);
//     return res.status(200).json({ product });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// async function handleCreateProductComment(req, res) {
//   const { parentId, comment } = req.body;
//   const { userId, productId } = req.params;
//   if (!comment)
//     return res.status(400).json({ message: 'missing required fields' });

//   const productComment = await prisma.productComment.create({
//     data: {
//       comment,
//       userId,
//       productId,
//       parentId: parentId || null,
//     },
//   });
//   return res
//     .status(200)
//     .json({ message: 'Comments Created Successfully', data: productComment });
// }

// async function handleUpdateProductComment(req, res) {
//   const { comment } = req.body;
//   const { commentId, userId } = req.params;

//   if (!comment)
//     return res.status(400).json({ message: 'Missing Contents Required' });

//   const findProductComment = await prisma.productComment.findUnique({
//     where: { id: commentId },
//   });

//   if (findProductComment.userId !== userId)
//     return res.status(401).json({
//       message: 'You are not authorized to perform the following actions',
//     });

//   const updateProductComment = await prisma.productComment.update({
//     where: {
//       id: commentId,
//     },
//     data: {
//       comment,
//     },
//   });

//   return res.status(200).json({
//     message: 'Updated Products Commented',
//     data: updateProductComment,
//   });
// }

// async function getProductCommentLike(req, res) {
//   const { userId, productCommentId } = req.params;

//   const totalLikes = await prisma.productCommentLike.groupBy({
//     by: ['productCommentId'],
//     where: {
//       productCommentId,
//     },
//     _count: {
//       _all: true,
//     },
//   });

//   const likeExists = await prisma.productCommentLike.findUnique({
//     where: {
//       userId_productCommentId: { userId, productCommentId },
//     },
//   });

//   console.log({ totalLikes: totalLikes[0]?._count?._all ?? 0 });

//   return res.status(200).json({
//     message: 'Get Liked SucessFully',
//     data: {
//       likeExists,
//       likesCount: totalLikes[0]?._count?._all ?? 0,
//     },
//   });
// }

// async function handleCommentLikeUpdate(req, res) {
//   const { userId, productCommentId } = req.params;
//   const like = await prisma.productCommentLike.findUnique({
//     where: { userId_productCommentId: { userId, productCommentId } },
//   });

//   if (like) {
//     await prisma.productCommentLike.delete({
//       where: { userId_productCommentId: { userId, productCommentId } },
//     });
//   } else {
//     await prisma.productCommentLike.create({
//       data: {
//         productCommentId,
//         userId,
//       },
//     });
//   }
//   return res.status(200).json({ message: 'Toggled Successfully' });
// }

// async function deleteComment(req, res) {
//   const { commentId, userId } = req.params;
//   const findComment = await prisma.productComment.findUnique({
//     where: { id: commentId },
//   });

//   if (findComment.userId !== userId)
//     return res
//       .status(400)
//       .json({ message: 'You are not authorized to do following actions' });
//   const deleteComment = await prisma.productComment.delete({
//     where: { id: commentId },
//   });

//   return res.status(200).json({
//     message: 'Delete the Product Comment Was Succesfully done',
//     data: deleteComment,
//   });
// }
