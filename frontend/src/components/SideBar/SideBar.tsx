import React from 'react';
import { motion, Variants } from 'framer-motion';
import SideNavLink from './SideNavLink';
import {
  PhotoIcon,
  ChartBarIcon,
  SquaresPlusIcon,
  ChatBubbleLeftIcon,
  GlobeEuropeAfricaIcon,
  UserIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';

interface Props {
  isSideBarOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ isSideBarOpen }) => {
  const asideVariants: Variants = {
    initial: {
      width: isSideBarOpen ? '16rem' : '4.5rem',
    },
    animate: {
      width: isSideBarOpen ? '4.5rem' : '16rem',
      transition: {
        type: 'tween',
      },
    },
  };

  return (
    <AnimatePresence initial={false}>
      <motion.aside
        initial={'initial'}
        animate={'animate'}
        variants={asideVariants}
        className="flex-shrink-0 bg-black text-white"
      >
        <div className="flex flex-col gap-2 py-4">
          <SideNavLink url="/home" Icon={HomeIcon} isOpen={isSideBarOpen}>
            Home
          </SideNavLink>
          <SideNavLink
            url="/feed"
            Icon={SquaresPlusIcon}
            isOpen={isSideBarOpen}
          >
            Feed
          </SideNavLink>

          <SideNavLink
            url="/popular"
            Icon={ChartBarIcon}
            isOpen={isSideBarOpen}
          >
            Popular Repos
          </SideNavLink>

          <SideNavLink
            url="/collaborator"
            Icon={GlobeEuropeAfricaIcon}
            isOpen={isSideBarOpen}
          >
            Collaborator
          </SideNavLink>
          <SideNavLink
            url="/chat"
            Icon={ChatBubbleLeftIcon}
            isOpen={isSideBarOpen}
          >
            Chat
          </SideNavLink>

          <SideNavLink
            url="/battle"
            Icon={WrenchScrewdriverIcon}
            isOpen={isSideBarOpen}
          >
            Battle
          </SideNavLink>

          <SideNavLink url="/profile" Icon={UserIcon} isOpen={isSideBarOpen}>
            Profile
          </SideNavLink>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

export default Sidebar;
