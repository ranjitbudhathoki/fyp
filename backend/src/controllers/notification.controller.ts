import prisma from '../services/prisma';
import { Request, Response, NextFunction } from 'express';
import checkIfUserIdMatches from '../utils/checkIfUserIdMatches';

async function handleMarkReadNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  checkIfUserIdMatches(req, userId, next);

  const updateNotifications = await prisma.notification.updateMany({
    where: {
      read: false,
      receiverId: userId,
    },
    data: {
      read: true,
    },
  });

  return res.status(200).json({
    message: 'Mark as Read Notification SucessFully',
    data: updateNotifications,
  });
}

async function getUnreadNotificationCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  checkIfUserIdMatches(req, userId, next);

  const unreadNotificationCount = await prisma.notification.groupBy({
    by: ['receiverId'],
    where: {
      receiverId: userId,
      read: false,
    },

    _count: {
      _all: true,
    },
  });

  return res.status(200).json({
    message: 'Unread Notification Count',
    data: unreadNotificationCount[0]?._count?._all ?? 0,
  });
}

async function getNotificationsByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  checkIfUserIdMatches(req, userId, next);

  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: userId,
    },

    // orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
  });

  return res
    .status(200)
    .json({ data: notifications, message: 'Notification Fetched SucessFully' });
}

async function handleDeleteNotificationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { notificationId, userId } = req.params;
  checkIfUserIdMatches(req, userId, next);

  const deleteNotification = await prisma.notification.delete({
    where: { id: notificationId },
  });

  return res.status(200).json({
    message: 'Notification deleted Succesfully',
    data: deleteNotification,
  });
}

export {
  getNotificationsByUserId,
  handleMarkReadNotification,
  getUnreadNotificationCount,
  handleDeleteNotificationById,
};
