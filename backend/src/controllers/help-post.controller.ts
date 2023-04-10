import prisma from '../services/prisma';
import { catchAsync } from '../utils/catchAsnyc';
import AppError from '../utils/appError';
import path from 'path';

const getAllHelpPost = catchAsync(async (req, res, next) => {
  const posts = await prisma.helpPost.findMany({
    where: {
      userId: {
        not: req.user.id,
      },
    },
    include: {
      user: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

const getHelpPostById = catchAsync(async (req, res, next) => {
  const post = await prisma.helpPost.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      user: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      },
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const createHelpPost = catchAsync(async (req, res, next) => {
  const { title, body } = req.body;
  const tags = JSON.parse(req.body.tags);

  if (!title || !tags)
    return res.status(400).json({ message: 'Please fill all the fields' });

  const files = req.files!;
  let file;
  if (files) {
    file = files[Object.keys(files)[0]] as any;

    const filePath = `./images/${file.name}+ ${new Date()}`;

    file.mv(filePath, (err: any) => {
      if (err)
        return res.status(400).json({ message: 'Error Occured in Image' });
    });
  }

  const post = await prisma.helpPost.create({
    data: {
      title,
      body,
      tech_stack: tags,
      project_link: req.body.link,
      image: file ? `http://localhost:8000/images/${file}` : '',
      userId: req.user.id,
      updatedAt: new Date(),
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const updatehelpPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.helpPost.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const updatedPost = await prisma.helpPost.update({
    where: {
      id,
    },
    data: {
      ...req.body,
    },
  });

  res.status(204).json({
    status: 'success',
    data: {
      post: updatedPost,
    },
  });
});

const deleteHelpPost = async (req, res, next) => {
  const { id } = req.params;

  const post = await prisma.helpPost.findFirst({
    where: { id, userId: req.user.id },
  });

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const deletedPost = await prisma.helpPost.delete({
    where: {
      id,
    },
  });
  res.status(204).json({
    status: 'success',
    data: deletedPost,
  });
};

const createComment = catchAsync(async (req, res, next) => {
  const { body, parentId } = req.body;
  const { id } = req.params;

  const comment = await prisma.comment.create({
    data: {
      body,
      updatedAt: new Date(),
      userId: req.user.id,
      postId: id,
      parentId: parentId || null,
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;

  const comment = await prisma.comment.findFirst({
    where: {
      id: id,
    },
  });

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  if (comment.userId !== req.user.id) {
    return next(
      new AppError('You are not authorized to update this comment', 401)
    );
  }

  const updatedComment = await prisma.helpPost.update({
    where: {
      id,
    },
    data: {
      body,
    },
  });

  res.status(204).json({
    status: 'success',
    data: {
      post: updatedComment,
    },
  });
});

const getCommentLike = async (req: any, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  const likes = await prisma.like.groupBy({
    by: ['commentId'],
    where: {
      commentId,
    },
    _count: {
      _all: true,
    },
  });

  const likeExists = await prisma.like.findUnique({
    where: {
      userId_commentId: { userId, commentId },
    },
  });
  return res.status(200).json({
    message: 'Get Liked SucessFully',
    data: {
      likeExists,
      likesCount: likes[0]?._count?._all ?? 0,
    },
  });
};

const handleLikeUpdate = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;
  const like = await prisma.like.findUnique({
    where: { userId_commentId: { userId, commentId } },
  });
  if (like) {
    await prisma.like.delete({
      where: { userId_commentId: { userId, commentId } },
    });
  } else {
    await prisma.like.create({
      data: {
        commentId,
        userId,
      },
    });
  }
  return res.status(200).json({ message: 'Toggled Successfully' });
});

const deleteComment = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  const deletedComment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  res.status(204).json({
    status: 'success',
    data: deletedComment,
  });
};

export {
  getAllHelpPost,
  getHelpPostById,
  createHelpPost,
  updatehelpPost,
  deleteHelpPost,
  createComment,
  updateComment,
  deleteComment,
  handleLikeUpdate,
  getCommentLike,
  // uploadPostImage,
};
