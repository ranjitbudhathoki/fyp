import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

const getAllMatchPost = catchAsync(async (req, res, next) => {
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

const getMatchPostById = catchAsync(async (req, res, next) => {
  const post = await prisma.helpPost.findUnique({
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

const updateMatchPost = catchAsync(async (req, res, next) => {
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

const deleteMatchPost = async (req, res, next) => {
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

export {
  getAllMatchPost,
  getMatchPostById,
  createMatchPost,
  updateMatchPost,
  deleteMatchPost,
};
