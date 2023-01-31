import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/store/store";
import axios from "../utils/axios-instance";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const logoutHandler = async () => {
    await axios.get("/auth/logout");
    dispatch(updateUser(null));
  };

  return (
    <nav className="flex items-center justify-between px-4 py-4  bg-[#27292a] border-b-4 border-[#333]">
      <h1 className="text-xl">Date.now()</h1>
      {user && (
        <ul className="flex items-center gap-3">
          <li>
            <BellIcon className="h-6 w-6" />
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
