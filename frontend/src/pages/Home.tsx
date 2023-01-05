import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

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
  return (
    <section className="h-full w-full overflow-hidden flex flex-col text-white">
      <nav className="flex items-center justify-between px-4 py-4  bg-[#27292a] border-b-4 border-[#333]">
        <h1 className="text-xl">Date.now()</h1>
        <ul className="flex items-center gap-3">
          <li>
            <BellIcon className="h-6 w-6" />
          </li>
          <li>
            <UserCircleIcon className="h-6 w-6" />
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
