import { Request } from 'express';
import AppError from './appError';

function checkIfUserIdMatches(req: Request, userId: string, next) {
  if (userId !== (req.user as any).id) {
    return next(
      new AppError('You are not authorized to perform this action', 401)
    );
  }
}

export default checkIfUserIdMatches;
