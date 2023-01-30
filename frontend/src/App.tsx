import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/404";
import Chat from "./pages/Chat";
import CodingBuddy from "./pages/CodingBuddy";
import Date from "./pages/Date";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { updateUser } from "./redux/slice/authSlice";
import axios from "./utils/axios-instance";
import ProtectedRoute from "./components/ProtectedRoute";
// import Profile from "./pages/Profile";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useQuery(
    ["user-data"],
    async function () {
      const res = await axios.get("/api/user/current-user");
      return res.data;
    },
    {}
  );

  useEffect(() => {
    if (data?.user) {
      dispatch(updateUser(data?.user));
    }
  }, [data?.user]);

  if (data?.user.is_first_time) {
  }

  return (
    <main
      className="h-screen 
     bg-[#18191a] font-poppins"
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="date" element={<Date />} />
          <Route path="coding-buddy" element={<CodingBuddy />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
