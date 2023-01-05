import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/404";
import Chat from "./pages/Chat";
import CodingBuddy from "./pages/CodingBuddy";
import Date from "./pages/Date";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <main
      className="h-screen 
     bg-[#18191a] font-poppins"
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="date" element={<Date />} />
          <Route path="date" element={<CodingBuddy />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
