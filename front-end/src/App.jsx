import React, { useState } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
//components
import NavBar from "./components/NavBar";
import WorkshopCalendar from "./components/WorkshopCalendar";
//pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import UserContext from "./context/user";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Staff from "./pages/Staff";

function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();
  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
          username,
          setUsername,
          userId,
          setUserId,
          role,
          setRole,
        }}
      >
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/" />} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="admin" element={<Admin />} />
          <Route path="staff" element={<Staff />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
    // <WorkshopCalendar />
  );
}

export default App;
