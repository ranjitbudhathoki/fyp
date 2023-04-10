import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomToastify from '../components/CustomToastify';
import Header from '../components/Header';
import ProfileForm from '../components/Profile/ProfileForm';
import ProtectedRoute from '../components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Home: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  const showProfileSetup =
    user?.createdAt && user?.updatedAt && user.createdAt === user.updatedAt;

  return (
    <ProtectedRoute>
      <CustomToastify />
      <section className=" flex flex-col  h-full">
        <Header />
        {showProfileSetup ? (
          <ProfileForm />
        ) : (
          <div className="flex flex-grow ">
            <Outlet />
          </div>
        )}
        {/* <div className="flex flex-grow ">
          <Outlet />
        </div> */}
      </section>
    </ProtectedRoute>
  );
};

export default Home;
