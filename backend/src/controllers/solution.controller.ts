import { createCanvas } from 'canvas';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';

async function createImage(body) {
  // Set canvas dimensions
  const width = 500;
  const height = Math.floor((width * 10) / 7);

  // Create canvas and draw code
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFF'; // set background color
  ctx.fillRect(0, 0, width, height); // fill background color
  ctx.font = `14px consolas 14px`;

  ctx.fillStyle = '#000'; // set text color
  ctx.fillText(body, 10, 20);
  // Generate unique filename for image
  const filename = `${nanoid()}.png`;

  // Save image to images folder
  await writeFile(`./images/${filename}`, canvas.toBuffer());
  return filename;
}

const saveSolution = catchAsync(async (req, res, next) => {
  const { postId, code, userId } = req.body;

  console.log(req.body);

  if (!postId || !code || !userId) {
    return next(new AppError('Please provide all the required fields', 400));
  }

  const filename = await createImage(code);

  if (!filename) {
    return next(new AppError('Something went wrong', 400));
  }

  const existingSolution = await prisma.solution.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingSolution) {
    return next(
      new AppError('You have already submitted a solution for this post', 400)
    );
  }

  const newSolution = await prisma.solution.create({
    data: {
      body: code,
      postId,
      userId,
      imgUrl: 'http://localhost:8000/images/' + filename,
    },
  });

  res.status(200).json({
    status: 'success',
    data: newSolution,
  });
});

export { saveSolution };