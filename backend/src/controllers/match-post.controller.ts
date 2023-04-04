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

  if (!posts) {
    return next(new AppError('No posts found', 404));
  }

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

  if (!post) {
    return next(new AppError('No post found with that used id', 404));
  }
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

  if (!post) {
    return next(new AppError('No post found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const createMatchPost = catchAsync(async (req, res, next) => {
  const { body, language } = req.body;

  console.log('body', req.body);

  const existingPost = await prisma.matchPost.findFirst({
    where: {
      userId: req.user.id,
    },
  });

  if (existingPost) {
    return res.status(400).json({
      status: 'fail',
      message: "You already have a post. You can't have multiple post",
    });
  }

  const post = await prisma.matchPost.create({
    data: {
      body: body,
      userId: req.user.id,
      language: language,
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

  console.log('from delete match post controller');

  console.log(id);

  const post = await prisma.matchPost.findFirst({
    where: { id, userId: req.user.id },
  });

  console.log('post', post);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const deletedPost = await prisma.matchPost.delete({
    where: {
      id,
    },
  });
  res.status(204).json({
    status: 'success',
    data: deletedPost,
  });
};

const createMatch = catchAsync(async (req, res, next) => {
  console.log('from create match');
  const { matchedUserId } = req.body;
  console.log(req.body);

  const match = await prisma.match.create({
    data: {
      user1: {
        connect: { id: req.user.id },
      },
      user2: {
        connect: { id: matchedUserId },
      },
    },
  });

  if (!match) {
    return next(new AppError('Match not created', 404));
  }

  res.status(201).json({
    status: 'success',
    data: match,
  });
});

export {
  getAllMatchPost,
  getMatchPostById,
  createMatchPost,
  updateMatchPost,
  deleteMatchPost,
  getMatchPostByUserId,
  createMatch,
};
