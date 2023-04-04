import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/store/store';
import axios from '../utils/axios-instance';

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const logoutHandler = async () => {
    await axios.get('/auth/logout');
    dispatch(updateUser(null));
  };

  return (
    <nav className="flex items-center justify-between px-4 py-4  bg-black ">
      <h1 className="text-xl text-white">Date.now()</h1>
      {user && (
        <ul className="flex items-center gap-3">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </li>

          <li>
            <div onClick={() => setShowLogout(!showLogout)}>
              {user ? (
                <div>
                  <img className="h-8 w-8 rounded-full" src={user?.photoUrl} />
                </div>
              ) : (
                <UserCircleIcon className="h-6 w-6" />
              )}
            </div>
            {showLogout && (
              <ul className="absolute right-0 mt-2 py-2 rounded-md bg-white ">
                <li>
                  <button
                    className="block w-full text-left px-4 text-sm font-medium leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
