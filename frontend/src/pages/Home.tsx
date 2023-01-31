import React, { useState } from "react";
import { Link, useLocation, Outlet, Navigate } from "react-router-dom";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Profile from "./Profile";

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
  console.log("home");

  const { user } = useSelector((state: any) => state.auth);

  if (user?.createdAt === user?.updatedAt) {
    return (
      <>
        <section className="h-full w-full overflow-hidden flex flex-col text-white">
          <Header />
          <Profile />
        </section>
      </>
    );
  }

  return (
    <section className="h-full w-full overflow-hidden flex flex-col text-white">
      <Header />
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
