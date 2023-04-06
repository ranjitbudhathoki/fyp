import express, { Request, Response, urlencoded } from 'express';
require('./services/passport');
import passport from 'passport';
import checkLoggedIn from './utils/checkLoggedIn';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { globalErrorHandler } from './utils/globalErrorHandler';
import AppError from './utils/appError';

import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import helpPostRouter from './routes/help-post.routes';
import matchPostRouter from './routes/match-post.routes';
import solutionRouter from './routes/solution.routes';
import prisma from './services/prisma';
import matchRouter from './routes/match.routes';
import adminRouter from './routes/admin.routes';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

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

app.use(express.static('images/'));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static('images/'));
app.use('/images', express.static('images/'));
app.use('/api/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/api/users', checkLoggedIn, userRouter);
app.use('/api/help-posts', checkLoggedIn, helpPostRouter);
app.use('/api/match-posts', matchPostRouter);
app.use('/api/matches', checkLoggedIn, matchRouter);
app.use('/api/solutions', checkLoggedIn, solutionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

process.on('unhandledRejection', (error: Error) => {
  throw error;
});

process.on('uncaughtException', (error: Error) => {
  console.log(error);
  process.exit(1);
});

export default app;
