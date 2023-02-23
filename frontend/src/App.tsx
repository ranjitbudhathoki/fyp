import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/404';
import Chat from './pages/Chat';
import Date from './pages/Date';
import Home from './pages/Home';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { updateUser } from './redux/slice/authSlice';
import axios from './utils/axios-instance';
import ProtectedRoute from './components/ProtectedRoute';
import Collaborator from './pages/Collaborator';
import Profile from './components/Profile/Profile';
import Post from './pages/Feed';
import AdminLogin from './pages/AdminLogin';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ['user-data'],
    queryFn: async function ({ queryKey }) {
      const res = await axios.get(`/api/users/user`);
      return res.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(updateUser(data?.user));
    }
  }, [data?.user, dispatch]);

  return (
    <main
      className="h-screen 
      bg-[#18191a] font-poppins"
    >
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Date />} />
          <Route path="feed" element={<Post />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="collaborator" element={<Collaborator />}>
            <Route path="posts/:id" element={<Post />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
