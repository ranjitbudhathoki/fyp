import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';
import prisma from '../services/prisma';
import verifyPassword from '../utils/verifyPassword';
import generateToken from '../utils/generateToken';
import { NotificationType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { param } from 'express-validator';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const handleAdminLogin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }

  const admin = await prisma.admin.findFirst({
    where: { username },
  });

  if (!admin) {
    return next(new AppError('You are not allowded to login!', 401));
  }
  await verifyPassword(password, admin.password);
  const token = generateToken({ id: admin.id });

  return res.status(200).json({
    status: 'success',
    data: {
      token,
      id: admin.id,
      username: admin.username,
      isSuperAdmin: admin.isSuperAdmin,
    },
  });
});

const getAllRegisteredUser = catchAsync(async (req, res, next) => {
  const { page } = req.query;
  const pageCount = 10;
  const registeredUser = await prisma.user.findMany({
    skip: (Number(page) - 1) * pageCount,
    take: pageCount,
  });

  return res.status(200).json({
    status: 'success',
    data: registeredUser,
  });
});

const deRegisterUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const removedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return res.status(200).json({
    status: 'success',
    data: null,
  });
});

const getTotalUserCount = catchAsync(async (req, res, next) => {
  const totalUserCount = await prisma.user.count();
  res.status(200).json({
    status: 'success',
    data: {
      totalUser: totalUserCount,
    },
  });
});

const getUserBySearch = catchAsync(async (req, res, next) => {
  const { searchTerm } = req.params;
  if (!searchTerm) {
    return next(new AppError('Please provide search term!', 400));
  }

  const results = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  if (!results) {
    return next(new AppError('No user found!', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: results,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  console.log('form get user by id', req.params);
  const { userId } = req.params;

  if (!userId) return next(new AppError('Please provide user id', 400));

  const user = await prisma.user.findMany({
    where: { id: userId },
  });

  if (!user) return next(new AppError('User not found', 404));

  return res.status(200).json({
    status: 'success',
    data: user,
  });
});

const getTotalMatches = catchAsync(async (req, res, next) => {
  const totalMatches = await prisma.match.count();
  res.status(200).json({
    status: 'success',
    data: {
      totalMatches,
    },
  });
});

const getRegisteredUserforEveryMonth = catchAsync(async (req, res, next) => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const endOfyear = new Date(new Date().getFullYear() + 1, 0, 1);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      createdAt: true,
    },
    where: {
      createdAt: {
        gte: startOfYear,
        lt: endOfyear,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const userByMonth = users.reduce((acc: any, user) => {
    const monthIdx = user.createdAt.getMonth();
    const key = months[monthIdx];
    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key] += 1;
    return acc;
  }, {});

  return res.status(200).json({
    status: 'success',
    data: userByMonth,
  });
});

const getMatchForEveryMonth = catchAsync(async (req, res, next) => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const endOfyear = new Date(new Date().getFullYear() + 1, 0, 1);

  const matches = await prisma.match.findMany({
    select: {
      id: true,
      createdAt: true,
    },
    where: {
      createdAt: {
        gte: startOfYear,
        lt: endOfyear,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const matchesByMonth = matches.reduce((acc: any, match) => {
    const monthIdx = match.createdAt.getMonth();
    const key = months[monthIdx];
    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key] += 1;
    return acc;
  }, {});

  return res.status(200).json({
    status: 'success',
    data: matchesByMonth,
  });
});

const appointAdmin = catchAsync(async (req, res, next) => {
  console.log('appoint admin');
  const { username, password } = req.body;

  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) return next(new AppError('Admin already exist', 400));

  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return res.status(200).json({
    status: 'success',
    data: admin,
  });
});

const getAllRegisteredAdmin = catchAsync(async (req, res, next) => {
  const { page } = req.query;
  const pageCount = 10;
  const registeredAdmin = await prisma.admin.findMany({
    where: {
      isSuperAdmin: false,
    },
    skip: (Number(page) - 1) * pageCount,
    take: pageCount,
  });

  return res.status(200).json({
    status: 'success',
    data: registeredAdmin,
  });
});

const deRegisterAdmin = catchAsync(async (req, res, next) => {
  console.log('from delete admin');

  const { userId } = req.params;
  console.log(userId);
  const removedAdmin = await prisma.admin.delete({
    where: { id: userId },
  });

  return res.status(200).json({
    status: 'success',
    data: null,
  });
});

const getAllRegisteredReport = catchAsync(async (req, res, next) => {
  const { page } = req.query;
  const pageCount = 10;
  const registeredReport = await prisma.report.findMany({
    skip: (Number(page) - 1) * pageCount,
    take: pageCount,
    include: { reportedUser: true },
  });

  return res.status(200).json({
    status: 'success',
    data: registeredReport,
  });
});

const getTotalReportCount = catchAsync(async (req, res, next) => {
  const totalReport = await prisma.report.count();
  res.status(200).json({
    status: 'success',
    data: {
      totalReport,
    },
  });
});

const createWarning = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const {
    admin: { id, username },
  } = req.body;

  console.log('id, username', id, username);
  console.log('param', userId);

  const notification = await prisma.notification.create({
    data: {
      type: NotificationType.WARNING,
      message: `You have received a warning from  ${username}. As you have violated our terms and conditions. Please be careful next time.`,
      senderAdminId: id,
      receiverId: userId,
    },
  });
  res.status(200).json({
    status: 'success',
    data: notification,
  });
});

export {
  handleAdminLogin,
  getAllRegisteredUser,
  deRegisterUser,
  getUserBySearch,
  getUserById,
  getTotalUserCount,
  getTotalMatches,
  getRegisteredUserforEveryMonth,
  getMatchForEveryMonth,
  appointAdmin,
  getAllRegisteredAdmin,
  deRegisterAdmin,
  getAllRegisteredReport,
  getTotalReportCount,
  createWarning,
};
