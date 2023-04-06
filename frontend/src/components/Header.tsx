// import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// import { RefObject, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../redux/store/store';
// import NotificationModal from '../Modals/NotificationModal';
// import axios from '../utils/axios-instance';
// import { useQuery } from 'react-query';
// import { motion } from 'framer-motion';

// const Header = () => {
//   const [showLogout, setShowLogout] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: any) => state.auth);

//   const notificationsRef = useRef(null) as RefObject<HTMLDivElement>;

//   const unReadNotificationQuery = useQuery('unread-notifications', async () => {
//     const res = await axios.get(
//       `/notification/${user.id}/get-unread-notifications-count`
//     );
//     return res.data;
//   });

//   const unreadNotificationCount = unReadNotificationQuery?.data?.data;

//   const logoutHandler = async () => {
//     await axios.get('/auth/logout');
//     dispatch(updateUser(null));
//   };

//   return (
//     <nav className="flex items-center justify-between px-4 py-4  bg-black ">
//       <h1 className="text-xl text-white">Date.now()</h1>
//       {user && (
//         <ul className="flex items-center gap-3">
//           {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 text-white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//               />
//             </svg> */}
//           <div className="flex items-center gap-4">
//             <div ref={notificationsRef}>
//               <motion.div
//                 whileTap={{ scale: 0 }}
//                 onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
//                 className="relative flex items-center justify-center w-10 h-10 cursor-pointer bg-[#333] select-none rounded-full"
//               >
//                 <div className=" w-5 h-5 flex items-center justify-center text-xs absolute top-[01px] right-[2px] bg-red-600 rounded-full">
//                   {unreadNotificationCount}
//                 </div>
//                 <BellIcon className="h-5 w-5 text-white" />
//               </motion.div>
//               {isNotificationsOpen && <NotificationModal />}
//             </div>
//           </div>

//           <li>
//             <div onClick={() => setShowLogout(!showLogout)}>
//               {user ? (
//                 <div>
//                   <img className="h-8 w-8 rounded-full" src={user?.photoUrl} />
//                 </div>
//               ) : (
//                 <UserCircleIcon className="h-6 w-6" />
//               )}
//             </div>
//             {showLogout && (
//               <ul className="absolute right-0 mt-2 py-2 rounded-md bg-white ">
//                 <li>
//                   <button
//                     className="block w-full text-left px-4 text-sm font-medium leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
//                     onClick={logoutHandler}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Header;

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
    // <nav className="flex items-center justify-between px-4 py-4  bg-black ">
    //   <h1 className="text-xl text-white">Date.now()</h1>
    //   {user && (
    //     <ul className="flex items-center gap-3">
    //       {/* <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 text-white"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    //           />
    //         </svg> */}
    //       <div className="flex items-center gap-4">
    //         <div ref={notificationsRef}>
    //           <motion.div
    //             whileTap={{ scale: 0 }}
    //             onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
    //             className="relative flex items-center justify-center w-10 h-10 cursor-pointer bg-[#333] select-none rounded-full"
    //           >
    //             <div className=" w-5 h-5 flex items-center justify-center text-xs absolute top-[01px] right-[2px] bg-red-600 rounded-full">
    //               {unreadNotificationCount}
    //             </div>
    //             <BellIcon className="h-5 w-5 text-white" />
    //           </motion.div>
    //           {isNotificationsOpen && <NotificationModal />}
    //         </div>
    //       </div>

    //       <li>
    //         <div onClick={() => setShowLogout(!showLogout)}>
    //           {user ? (
    //             <div>
    //               <img className="h-8 w-8 rounded-full" src={user?.photoUrl} />
    //             </div>
    //           ) : (
    //             <UserCircleIcon className="h-6 w-6" />
    //           )}
    //         </div>
    //         {showLogout && (
    //           <ul className="absolute right-0 mt-2 py-2 rounded-md bg-white ">
    //             <li>
    //               <button
    //                 className="block w-full text-left px-4 text-sm font-medium leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
    //                 onClick={logoutHandler}
    //               >
    //                 Logout
    //               </button>
    //             </li>
    //           </ul>
    //         )}
    //       </li>
    //     </ul>
    //   )}
    // </nav>

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
