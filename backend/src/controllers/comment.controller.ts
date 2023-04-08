import { catchAsync } from '../utils/catchAsnyc';
import prisma from '../services/prisma';
import AppError from '../utils/appError';
import { NotificationType } from '@prisma/client';

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

  const targetPost = await prisma.helpPost.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  // Create notification when a comment is made on a post
  if (!parentId && comment.userId !== targetPost.userId) {
    await prisma.notification.create({
      data: {
        type: NotificationType.COMMENT,
        message: `You have a new comment from ${req.user.username}`,
        senderId: req.user.id,
        receiverId: targetPost.user.id,
        postId: id,
      },
    });
  }

  // Create notification when a reply is made to a comment
  if (parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: {
        id: parentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (comment.userId !== parentComment.userId) {
      await prisma.notification.create({
        data: {
          type: NotificationType.COMMENT,
          message: `You have a new reply from ${req.user.username}`,
          senderId: req.user.id,
          receiverId: parentComment.user.id,
          postId: id,
        },
      });
    }
  }

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

  const updatedComment = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      body,
    },
  });

  console.log(updatedComment);
  res.status(204).json({
    status: 'success',
    data: {
      post: updatedComment,
    },
  });
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

const getCommentLike = async (req: any, res, next) => {
  const { commentId } = req.params;

  console.log('from comment id', commentId);
  const userId = req.user.id;

  const totalLikes = await prisma.like.groupBy({
    by: ['commentId'],
    where: {
      commentId: String(commentId),
    },
    _count: {
      _all: true,
    },
  });

  const isLiked = await prisma.like.findUnique({
    where: {
      userId_commentId: { userId, commentId },
    },
  });
  return res.status(200).json({
    message: 'Get Liked SucessFully',
    data: {
      totalLikes: totalLikes[0]?._count?._all ?? 0,
      likedByMe: Boolean(isLiked),
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
export {
  updateComment,
  createComment,
  deleteComment,
  getCommentLike,
  handleLikeUpdate,
};
