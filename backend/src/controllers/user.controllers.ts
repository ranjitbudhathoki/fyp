import prisma from '../services/prisma';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsnyc';

const getCurrentUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return new AppError('The user is not logged in yet.', 403);
  }
  res.status(200).json({
    user: user,
  });
});

const updateProfile = catchAsync(async (req, res, next) => {
  const { birthDate, gender, preferredGender } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      birthDate: new Date(birthDate),
      gender: gender,
      preferredGender: preferredGender,
      updatedAt: new Date(),
    },
  });
  res.status(200).json({
    updatedUser,
  });
});

const getHelpPostByUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id !== req.user.id) {
    return next(
      new AppError('You are not authorized to access this resource', 403)
    );
  }

  const posts = await prisma.helpPost.findMany({
    where: {
      userId: req.user.id,
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
  const { id } = req.params;

  if (id !== req.user.id) {
    return next(
      new AppError('You are not authorized to access this resource', 403)
    );
  }

  const posts = await prisma.matchPost.findMany({
    where: {
      userId: req.user.id,
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

export {
  updateProfile,
  getHelpPostByUserId,
  getMatchPostByUserId,
  getCurrentUser,
};
