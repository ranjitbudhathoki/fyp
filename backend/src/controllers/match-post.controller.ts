import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';
import { NotificationType } from '@prisma/client';

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

  if (!body || !language) {
    return next(new AppError('Please provide body and language', 400));
  }

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
  const { matchedUserId, solutionId } = req.body;
  console.log(req.body);

  const existingMatch = await prisma.match.findUnique({
    where: {
      userId1_userId2: {
        userId1: req.user.id,
        userId2: matchedUserId,
      },
    },
  });

  if (existingMatch) {
    return next(new AppError('You already matched with this user', 400));
  }

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

  if (match) {
    const deletedsoln = await prisma.solution.delete({
      where: {
        id: solutionId,
      },
    });
  }

  const matchedUser = await prisma.user.findUnique({
    where: {
      id: matchedUserId,
    },
    select: {
      username: true,
    },
  });

  const notification = await prisma.notification.create({
    data: {
      type: NotificationType.MATCHED,
      message: `You have matched with ${matchedUser.username}`,
      senderId: req.user.id,
      receiverId: matchedUserId,
    },
  });

  res.status(201).json({
    status: 'success',
    data: match,
  });
});

const deleteMatch = catchAsync(async (req, res, next) => {
  const { matchId } = req.params;

  const match = await prisma.match.findUnique({
    where: {
      id: matchId,
    },
  });

  if (!match) {
    return next(new AppError('Match not found', 404));
  }

  const deletedMatch = await prisma.match.delete({
    where: {
      id: matchId,
    },
  });

  res.status(204).json({
    status: 'success',
    data: deletedMatch,
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
  deleteMatch,
};
