import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/login.page";
import Register from "../pages/register/register.pages";
import { SchoolRoutes } from "../components/routes/schoolRoutes";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="/*" element={<SchoolRoutes />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
