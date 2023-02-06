import express, { Request, Response } from 'express';
require('./services/passport');
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';
import passport from 'passport';
import checkLoggedIn from './utils/checkLoggedIn';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { globalErrorHandler } from './utils/globalErrorHandler';
import AppError from './utils/appError';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY as string],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.use('/api/users', checkLoggedIn, userRouter);
app.use('/api/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
