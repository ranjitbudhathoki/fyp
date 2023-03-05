import express, { Request, Response, urlencoded } from 'express';
require('./services/passport');

import passport from 'passport';
import checkLoggedIn from './utils/checkLoggedIn';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { globalErrorHandler } from './utils/globalErrorHandler';
import AppError from './utils/appError';
import { createCanvas } from 'canvas';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import helpPostRouter from './routes/help-post.routes';
import matchPostRouter from './routes/match-post.routes';
import prisma from './services/prisma';
import path from 'path';
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
app.use(express.static(path.join(__dirname, 'images')));

console.log(__dirname);
console.log(express.static('images/'));

app.use('/images', express.static('images/'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.use('/api/users', checkLoggedIn, userRouter);
app.use('/api/help-posts', checkLoggedIn, helpPostRouter);
app.use('/api/match-posts', checkLoggedIn, matchPostRouter);

app.post('/api/save-snippet', async (req, res) => {
  const { code } = req.body;

  // Set canvas dimensions
  const width = 400;
  const height = Math.floor((width * 10) / 7);

  // Create canvas and draw code
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#272822'; // set background color
  ctx.fillRect(0, 0, width, height); // fill background color
  ctx.font = `14px monospace`;
  ctx.fillStyle = '#f8f8f2'; // set text color
  ctx.fillText(code, 10, 20);

  // Generate unique filename for image
  const filename = `${nanoid()}.png`;

  // Save image to images folder
  await writeFile(`./images/${filename}`, canvas.toBuffer());

  // Return success response with filename
  res.status(200).json({ success: true, filename });
});

app.post('/api/save-solution', async (req, res) => {
  try {
    console.log(req.body);
    const { postId, body, userId, imgUrl } = req.body;

    // Save the new solution to the database
    const newSolution = await prisma.solution.create({
      data: {
        body,
        postId,
        userId,
        imgUrl,
      },
    });

    console.log(newSolution);

    res.status(200).json(newSolution);
  } catch (error) {
    console.error('Error saving solution:', error);
    res.status(500).json({ message: error });
  }
});

app.get('/api/solutions/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    // Find all solutions for the specified post ID
    const solutions = await prisma.solution.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: true,
      },
    });

    console.log(solutions);
    res.status(200).json(solutions);
  } catch (error) {
    console.error('Error getting solutions:', error);
    res.status(500).json({ message: error });
  }
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
