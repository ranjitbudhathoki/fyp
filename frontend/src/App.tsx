import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/404';
import Chat from './pages/Chat';
import Date from './pages/Date';
import Home from './pages/Home';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { updateUser } from './redux/slice/authSlice';
import axios from './utils/axios-instance';
import ProtectedRoute from './components/ProtectedRoute';
import Collaborator from './pages/Collaborator';
import Profile from './components/Profile/Profile';
import AdminLogin from './pages/AdminLogin';
import Feed from './pages/Feed';
import HelpPostDetail from './pages/HelpPostDetail';
import Comment from './components/comment/Comment';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ['user-data'],
    queryFn: async function ({ queryKey }) {
      const res = await axios.get(`/api/users/user`);
      return res.data;
    },
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
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="collaborator" element={<Collaborator />} />
          <Route path="collaborator/posts/:id" element={<HelpPostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
