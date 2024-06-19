//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { FC } from 'react';
import Home from "./pages/home/home.page";
import Login from "./auth/pages/login/login.page";
//import Lounge from './components/Lounge';
//import LinkPage from './components/LinkPage';
import Layout from './components/RouteProtected/Layout';
import Missing from './components/RouteProtected/Missing';
import RequireAuth from './components/RouteProtected/RequireAuth';
import { Routes, Route } from 'react-router-dom';

import "./App.css";
import Unauthorized from './components/RouteProtected/Unauthorized';
import AdminStudents from './pages/adminStudents/adminStudents.page';
import AdminCourse from './pages/adminCourse/adminCourse.page';



interface Roles {
  Admin: string;  
  Estudent: string;
}
const ROLES: Roles = {
  Admin: "admin",
  Estudent: "editor",
};




const App: FC = () => {
  type teacher = {
    name: string;
    location: string;
    phone: string;
    email: string;
  };



  const teacherData: teacher = {
    name: "Juan Carlos",
    location: "DF, México",
    phone: "+12 345 6789 0",
    email: "juancarlosabc@mail.com",
  };



  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />    
        <Route path="/../unauthorized" element={<Unauthorized/>}/>
       


        {/* Routes protected */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}  />}>
        <Route
          path="/adminstudents"
          element={<AdminStudents teacherData={teacherData} />}
        ></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Estudent]} />}>
       
        <Route
          path="/admincourse"
          element={<AdminCourse teacherData={teacherData} />}
        ></Route>

        </Route>
        {/*<Route element={<RequireAuth allowedRoles={[ROLES.Estudent, ROLES.Admin]} />}>
          <Route path="/admincalendar" element={<AdminCalendar />} />
        </Route>*/}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
