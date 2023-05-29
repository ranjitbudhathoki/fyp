import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { RefObject, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/store/store';
import NotificationModal from '../Modals/NotificationModal';
import axios from '../utils/axios-instance';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UserModal from '../Modals/UserModal';

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showUserDetails, setShowUserDetail] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const profileRef = useRef(null) as RefObject<HTMLDivElement>;
  const notificationsRef = useRef(null) as RefObject<HTMLDivElement>;

  const unReadNotificationQuery = useQuery(
    'unread-notifications',
    async () => {
      const res = await axios.get(
        `/notification/${user.id}/get-unread-notifications-count`
      );
      return res.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const unreadNotificationCount = unReadNotificationQuery?.data?.data;

  const logoutHandler = async () => {
    await axios.get('/auth/logout');
    dispatch(updateUser(null));
  };

  return (
    <nav
      className="relative h-[10vh] text-white px-6 py-8 flex items-center justify-between
    bg-[#27292a] border-b-4 border-[#333]
    "
    >
      <h1 className="text-xl md:text-2xl">
        <Link to="/home">Date.now</Link>
      </h1>
      <div className="flex items-center gap-4">
        <div ref={notificationsRef}>
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative flex items-center justify-center w-10 h-10 cursor-pointer bg-[#333] select-none rounded-full"
          >
            <div className=" w-5 h-5 flex items-center justify-center text-xs absolute top-[01px] right-[2px] bg-red-600 rounded-full">
              {unreadNotificationCount}
            </div>
            <BellIcon className="h-5 w-5 text-white" />
          </motion.div>
          {isNotificationsOpen && <NotificationModal />}
        </div>
        <motion.div
          ref={profileRef}
          className="relative flex items-center rounded-full"
          onClick={() => setShowUserDetail(!showUserDetails)}
        >
          <img
            className="w-10 h-10 cursor-pointer rounded-full"
            src={user?.photoUrl}
            alt="User Profile"
            referrerPolicy="no-referrer"
          />
          {showUserDetails && <UserModal user={user} />}{' '}
        </motion.div>{' '}
      </div>{' '}
    </nav>
  );
};

export default Header;
