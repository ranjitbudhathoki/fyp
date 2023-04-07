import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminDashboard from '../components/Admin/AdminDashboard';
import UserAnalytics from '../components/Admin/UserAnalytics';
import AppointAdmin from '../components/Admin/AppointAdmin';
// import WorkspaceAnalytics from '../components/SystemAdmin/WorkspaceAnalytics';
import AdminSearch from '../components/Admin/AdminSearch';
import { useSystemAdmin } from '../context/AdminContext';

enum Tab {
  DASHBOARD = 'DASHBOARD',
  USER = 'USER',
  APPOINT_ADMIN = 'APPOINT_ADMIN',
  SEARCH = 'SEARCH ',
}

interface TabbedButtonProps {
  tabType: Tab;
  setSelectedTab: any;
  children: React.ReactNode;
  selectedTab: Tab;
}

const TabbedButton: React.FC<TabbedButtonProps> = ({
  children,
  selectedTab,
  tabType,
  setSelectedTab,
}) => {
  const isActive =
    selectedTab === tabType ? 'text-custom-light-green' : 'text-gray-400';
  return (
    <li className="mr-2" onClick={() => setSelectedTab(tabType)}>
      <button
        className={`p-4  ${isActive} bg-custom-light-dark rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}
      >
        {children}
      </button>
    </li>
  );
};

const AdminNavBar: React.FC<any> = ({ logout }) => {
  return (
    <header>
      <nav className="flex flex-shrink-0 items-center justify-between px-8 py-4 bg-custom-light-dark text-custom-light-green">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <div>
          <button
            onClick={logout}
            className="px-6 py-2 rounded-md  text-red-400 hover:text-red-600"
          >
            <ArrowLeftOnRectangleIcon className="h-8 w-8" />
          </button>
        </div>
      </nav>
    </header>
  );
};

function SystemAdmin() {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const { setAdmin, admin } = useSystemAdmin();
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.DASHBOARD);

  const handleLogout = () => {
    setAdmin(null);
    navigate('/system/admin/login', { replace: true });
  };

  if (user) return <Navigate to={'/login'} replace={true} />;
  if (!admin) return <Navigate to={'/system/admin/login'} replace={true} />;
  return (
    <div className="flex flex-col h-full  ">
      <AdminNavBar logout={handleLogout} />
      <div className="px-5 flex flex-grow flex-col gap-4 overflow-y-scroll custom-scrollbar">
        <ul className="flex mt-3  flex-wrap text-sm font-medium text-center text-gray-500 border-b border-custom-light-dark ">
          <TabbedButton
            tabType={Tab.DASHBOARD}
            selectedTab={selectedTab}
            setSelectedTab={() => {
              setSelectedTab(Tab.DASHBOARD);
            }}
          >
            Dashboard
          </TabbedButton>
          <TabbedButton
            tabType={Tab.USER}
            selectedTab={selectedTab}
            setSelectedTab={() => setSelectedTab(Tab.USER)}
          >
            User
          </TabbedButton>
          <TabbedButton
            tabType={Tab.APPOINT_ADMIN}
            selectedTab={selectedTab}
            setSelectedTab={() => setSelectedTab(Tab.APPOINT_ADMIN)}
          >
            Appoint Admin
          </TabbedButton>
          <TabbedButton
            tabType={Tab.SEARCH}
            selectedTab={selectedTab}
            setSelectedTab={() => setSelectedTab(Tab.SEARCH)}
          >
            Search
          </TabbedButton>
        </ul>
        <div className="h-full w-full pb-6 ">
          {selectedTab === Tab.DASHBOARD && <AdminDashboard />}
          {selectedTab === Tab.USER && <UserAnalytics />}
          {selectedTab === Tab.APPOINT_ADMIN && <AppointAdmin />}
          {selectedTab === Tab.SEARCH && <AdminSearch />}
        </div>
      </div>
    </div>
  );
}

export default SystemAdmin;
