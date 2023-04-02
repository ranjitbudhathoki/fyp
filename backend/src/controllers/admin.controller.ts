import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';
import prisma from '../services/prisma';
import verifyPassword from '../utils/verifyPassword';

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
});
