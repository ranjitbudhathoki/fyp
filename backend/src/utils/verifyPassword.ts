import bcrypt from 'bcryptjs';
import AppError from './appError';

async function verifyPassword(password: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new AppError("Password doesn't match", 400);
  }
  return isMatch;
}

export default verifyPassword;
