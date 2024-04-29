import React from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
//components
import NavBar from "./components/NavBar";
import WorkshopCalendar from "./components/WorkshopCalendar";
//pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/" />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
    // <WorkshopCalendar />
  );
}

export default App;
