import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/404";
import Chat from "./pages/Chat";
import CodingBuddy from "./pages/CodingBuddy";
import Date from "./pages/Date";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { updateUser } from "./redux/slice/authSlice";
import axios from "./utils/axios-instance";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Header from "./components/Header";

const App: React.FC = () => {
  console.log("app");
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["user-data"],
    queryFn: async function () {
      const res = await axios.get("/api/user/current-user");
      return res.data;
    },
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(updateUser(data?.user));
    }
  }, [data?.user, dispatch]);
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black ">
        <div
          className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-green-500 border-t-transparent"
        ></div>
      </div>
    );
  }

  return (
    <main
      className="h-screen 
      bg-[#18191a] font-poppins"
    >
      <Routes>
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/login" element={<Login />} />

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
