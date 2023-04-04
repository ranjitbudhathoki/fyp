import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomToastify from '../components/CustomToastify';
import Header from '../components/Header';

import ProtectedRoute from '../components/ProtectedRoute';

const Home: React.FC = () => {
  return (
    <ProtectedRoute>
      <CustomToastify />
      <section className=" flex flex-col  h-full">
        <Header />
        <div className="flex flex-grow ">
          <Outlet />
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default Home;
