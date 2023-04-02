import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import Profile from '../components/Profile/ProfileForm';
import SideNavLink from '../components/SideBar/SideNavLink';

const Home: React.FC = () => {
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
            <SideNavLink url="/home">Home</SideNavLink>
            <SideNavLink url="/feed">Feed</SideNavLink>

            {/* <SideNavLink url="/coding-buddy">Coding Buddy</SideNavLink> */}
            {/* <SideNavLink url="/posts">Projects</SideNavLink> */}
            <SideNavLink url="/collaborator">Collaborator</SideNavLink>
            <SideNavLink url="/chat">Chat</SideNavLink>
            <SideNavLink url="/popular">Popular Repos</SideNavLink>

            <SideNavLink url="/profile">Profile</SideNavLink>
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
