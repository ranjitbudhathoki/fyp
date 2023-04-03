import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';
import prisma from '../services/prisma';
import verifyPassword from '../utils/verifyPassword';
import generateToken from '../utils/generateToken';

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
  const { userId } = req.params;

  if (!userId) return next(new AppError('Please provide user id', 400));

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return next(new AppError('User not found', 404));

  return res.status(200).json({
    status: 'success',
    data: user,
  });
});

export {
  handleAdminLogin,
  getAllRegisteredUser,
  deRegisterUser,
  getUserBySearch,
  getUserById,
  getTotalUserCount,
};
