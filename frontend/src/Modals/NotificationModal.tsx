import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import handleStopPropagation from '../utils/handleStopPropagation';
import NotificationType from '../utils/NotificationType';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { formatRelative } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/solid';

interface NormalNotificationProps {
  notification: any;
}
const NormalNotification: React.FC<NormalNotificationProps> = ({
  notification,
}) => {
  return (
    <div className="p-2 rounded-md flex gap-4 items-center">
      <figure className=" flex-shrink-0 w-14 h-14   rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={notification?.sender?.photoUrl}
          alt={notification?.sender?.username}
        />
      </figure>
      <div className="flex flex-col gap-1">
        <h3 className="text-base">{`${notification.message}`}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-custom-light-green">
            {formatRelative(new Date(notification.createdAt), new Date())}
          </p>
        </div>
      </div>
    </div>
  );
};

interface NotificationTemplateDeciderProps {
  type: NotificationType;
  notification: any;
}
const NotificationTemplateDecider: React.FC<
  NotificationTemplateDeciderProps
> = ({ type, notification }) => {
  const {
    user: { id: userId },
  } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();

  console.log('notification', notification);

  const { mutate } = useMutation(
    async () => {
      const res = await axios.delete(
        `/notification/${userId}/${notification.id}/delete-notification`
      );
      return res.data;
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries('notifications');
      },
      onError(error) {},
    }
  );

  let content = <NormalNotification notification={notification} />;

  return (
    <div className="border-b relative group  border-custom-light-green">
      <div>{content}</div>

      <div className="absolute right-0 top-2 hidden group-hover:flex">
        <button
          onClick={() => mutate()}
          className="text-gray-400 hover:text-custom-light-green"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const NotificationModal: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    user: { id: userId },
  } = useSelector((state: any) => state.auth);

  const { mutate: markAsReadMutate } = useMutation(
    async () => {
      const res = await axios.patch(
        `/notification/${userId}/mark-notification-read`
      );
      return res.data;
    },
    {
      onSuccess(data: any) {
        queryClient.invalidateQueries('unread-notifications');
      },
      onError(error: any) {},
    }
  );

  const { data: notifications, isLoading } = useQuery(
    'notifications',
    async () => {
      const res = await axios.get(`/notification/${userId}/get-notifications`);
      return res.data?.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    markAsReadMutate();
  }, [markAsReadMutate]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={handleStopPropagation}
      className="fixed  h-[85vh] border-2  flex flex-col gap-3 top-14 right-20 w-[360px] bg-custom-light-dark  border-dark-gray shadow-md rounded-md p-2 pt-4 text-2xl z-50 origin-top-right overflow-y-auto overflow-x-hidden custom-scrollbar"
    >
      <h2>Notifications</h2>
      <div className="flex flex-col gap-3">
        {notifications?.map((notification: any) => (
          <div key={notification.id}>
            <NotificationTemplateDecider
              type={notification.type}
              notification={notification}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationModal;
