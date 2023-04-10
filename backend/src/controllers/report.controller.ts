import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

const createReport = catchAsync(async (req, res, next) => {});

const getAllReports = catchAsync(async (req, res, next) => {});

export { createReport, getAllReports };
