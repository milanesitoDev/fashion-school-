import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/pages/login/login.page";
import Register from "../auth/pages/register/register.pages";
import { SchoolRoutes } from "../components/routes/schoolRoutes";
import ForgotPassword from "../auth/pages/forgotPass/forgotPassword.page";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="forgotpassword" element={<ForgotPassword/>} />
        <Route path="/*" element={<SchoolRoutes />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
