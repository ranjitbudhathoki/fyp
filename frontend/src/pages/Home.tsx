import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "../utils/axios-instance";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slice/authSlice";

const SideNavLink = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const activeLink = location.pathname === url;
  return (
    <button
      className={`${
        activeLink ? "bg-[#434343]" : ""
      } overflow-hidden rounded-md`}
    >
      <Link className="flex gap-2 items-center px-6 py-3" to={url}>
        {children}
      </Link>
    </button>
  );
};

const Home: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {};
  return (
    <section className="h-full w-full overflow-hidden flex flex-col text-white">
      <nav className="flex items-center justify-between px-4 py-4  bg-[#27292a] border-b-4 border-[#333]">
        <h1 className="text-xl">Date.now()</h1>
        <ul className="flex items-center gap-3">
          <li>
            <BellIcon className="h-6 w-6" />
          </li>
          {/* <li>
            <UserCircleIcon className="h-6 w-6" />
          </li> */}
          <li>
            <div onClick={() => setShowLogout(!showLogout)}>
              <UserCircleIcon className="h-6 w-6" />
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
      </nav>
      <div className="flex flex-grow">
        <aside className="basis-60 bg-[#27292a]">
          <ul className="flex flex-col gap-2 p-2">
            <SideNavLink url="/date">Date</SideNavLink>
            <SideNavLink url="/coding-buddy">Coding Buddy</SideNavLink>
            <SideNavLink url="/collaborator">Collaborator</SideNavLink>
            <SideNavLink url="/chat">Chat</SideNavLink>
          </ul>
        </aside>
        <div className="p-2 flex-grow">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Home;
