import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

const getAllHelpPost = catchAsync(async (req, res, next) => {
  const posts = await prisma.helpPost.findMany({
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

const getHelpPostById = catchAsync(async (req, res, next) => {
  const post = await prisma.helpPost.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      comments: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const createHelpPost = catchAsync(async (req, res, next) => {
  const { title, body, tech_stack, project_link } = req.body;

  const post = await prisma.helpPost.create({
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

const updatehelpPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.helpPost.findFirst({
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

const deleteHelpPost = async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.helpPost.findFirst({
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

  const updatedComment = await prisma.helpPost.update({
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
  getAllHelpPost,
  getHelpPostById,
  createHelpPost,
  updatehelpPost,
  deleteHelpPost,
  createComment,
  updateComment,
  deletedComment,
};
