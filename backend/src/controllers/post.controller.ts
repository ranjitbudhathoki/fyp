import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

const getAllPost = catchAsync(async (req, res, next) => {
  const posts = await prisma.post.findMany({
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

const getPostById = catchAsync(async (req, res, next) => {
  const post = await prisma.post.findUnique({
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

const createPost = catchAsync(async (req, res, next) => {
  const { title, body, tech_stack, project_link } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      body,
      tech_stack,
      project_link,
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

const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.post.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const updatedPost = await prisma.post.update({
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

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.post.findFirst({
    where: { id, userId: req.user.id },
  });

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  res.status(204).json({
    status: 'success',
    data: deletedPost,
  });
};

const getPostComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const posts = await prisma.comment.findMany({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

const createComment = catchAsync(async (req, res, next) => {
  const { body, parentId } = req.body;
  const { id } = req.params;

  const comment = await prisma.comment.create({
    data: {
      body,
      updatedAt: new Date(),
      userId: req.user.id,
      postId: id,
      parentId,
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await prisma.comment.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  const updatedComment = await prisma.post.update({
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
      post: updatedComment,
    },
  });
});

const deletedComment = async (req, res, next) => {
  const { id } = req.params;
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  const deletedComment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  res.status(204).json({
    status: 'success',
    data: deletedComment,
  });
};

export {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostComment,
  createComment,
  updateComment,
  deletedComment,
};
