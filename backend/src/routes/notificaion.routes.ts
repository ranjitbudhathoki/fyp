import express from 'express';
import {
  getNotificationsByUserId,
  getUnreadNotificationCount,
  handleDeleteNotificationById,
  handleMarkReadNotification,
} from '../controllers/notification.controller';

const notificationRouter = express.Router();

notificationRouter.get('/:userId/get-notifications', getNotificationsByUserId);

notificationRouter.get(
  '/:userId/get-unread-notifications-count',
  getUnreadNotificationCount
);

notificationRouter.patch(
  '/:userId/mark-notification-read',
  handleMarkReadNotification
);

notificationRouter.delete(
  '/:userId/:notificationId/delete-notification',
  handleDeleteNotificationById
);

export default notificationRouter;
