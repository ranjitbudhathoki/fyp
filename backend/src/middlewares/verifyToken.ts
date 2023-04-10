import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';

function verifyToken(req, res, next) {
  const header = req.headers && req.headers['authorization'];

  console.log('from verify token', header);
  const token = header?.split(' ')[1];
  if (!token) {
    return next(new AppError('Access denied', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'fail' });
  }
}

export default verifyToken;
