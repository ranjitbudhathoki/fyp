import prisma from '../services/prisma';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsnyc';

import moment from 'moment';

const getCurrentUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return new AppError('The user is not logged in yet.', 403);
  }
  res.status(200).json({
    user: user,
  });
});

const createProfile = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { birthDate, gender, preferredGender } = req.body;

  if (!birthDate || !gender || !preferredGender) {
    return next(new AppError('Please fill all the required fields', 400));
  }

  const formattedBirthDate = moment(birthDate).format();
  const age = moment().diff(formattedBirthDate, 'years');

  if (age < 18) {
    return next(
      new AppError('You must be at least 18 years old to create a profile', 400)
    );
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      birthDate: formattedBirthDate,
      gender: gender,
      preferredGender: preferredGender,
      updatedAt: new Date(),
    },
  });

  res.status(200).json({
    updatedUser,
  });
});

const updateProfile = catchAsync(async (req, res, next) => {
  const { bio, preferredGender } = req.body;
  if (!req.body) {
    return next(new AppError('Please update something', 400));
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      bio: bio,
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

const createReport = catchAsync(async (req, res, next) => {
  const { reportedUserId } = req.params;

  if (!reportedUserId) {
    return next(new AppError('Please fill all the required fields', 400));
  }

  const existingReport = await prisma.report.findFirst({
    where: {
      reportedUserId: reportedUserId,
    },
  });

  if (existingReport) {
    // If an existing report is found, increment its report count
    const updatedReport = await prisma.report.update({
      where: { id: existingReport.id },
      data: { count: existingReport.count + 1 },
    });
  }

  if (!existingReport) {
    // If no existing report is found, create a new report
    const report = await prisma.report.create({
      data: {
        reportedUserId: reportedUserId,
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: reportedUserId,
  });
});

export {
  updateProfile,
  getHelpPostByUserId,
  getMatchPostByUserId,
  getCurrentUser,
  createProfile,
  createReport,
};
