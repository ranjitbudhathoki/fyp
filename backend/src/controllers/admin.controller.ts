import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
});

export { login };
