//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { FC } from 'react';
import Home from "./pages/home/home.page";
import Login from "./auth/pages/login/login.page";
//import Lounge from './components/Lounge';
//import LinkPage from './components/LinkPage';
import Layout from './components/RouteProtected/Layout';
import Missing from './components/RouteProtected/Missing';
import RequireAuth from './components/RouteProtected/RequireAuth';
import { Navigate,Routes, Route } from 'react-router-dom';

import "./App.css";
import Unauthorized from './components/RouteProtected/Unauthorized';
import AdminStudents from './pages/adminStudents/adminStudents.page';
import AdminCourse from './pages/adminCourse/adminCourse.page';
import AdminUpFile from './pages/adminUpFile/adminUpFile.page';
import AdminTeacher from './pages/adminTeacher/adminTeacher.page';
import Register from './auth/pages/register/register.pages';



interface Roles {
  Admin: string;  
  Student: string;
  Teacher: string;
}
const ROLES: Roles = {
  Admin: "admin",
  Student: "student",
  Teacher: "teacher",
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

 
  
  type student = {
    name: string;
  };
  const teacherstudent: student = {
    name: "Juan Carlos",
  };
  type message = {
    text: string;
    time: Date;
  };

  type chat = {
    chat: string;
    messages: message[];
  };
  const teacherschat: chat = {
    chat: "Juan Carlos",
    messages:[],
  };
 
  /*
  cb7327dd
   */



  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />    
        <Route path="/../unauthorized" element={<Unauthorized/>}/>
        <Route path="/register" element={<Register/>}/>
       


        {/* Routes protected */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Student]}  />}>
        <Route
          path="/adminstudents"
          element={<AdminStudents teacherData={teacherData} />}
        ></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admintupfile" element={<AdminUpFile teacherData={teacherData} />}
          ></Route>
           <Route path="/" element={<Navigate to="/billing" />} />
           </Route>
           
        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
          <Route
              path="/adminteacher" element={<AdminTeacher teacherData={teacherData} students={[teacherstudent]} messages={[teacherschat]} />}>
            </Route>
            <Route path="/admincurse" element={<AdminCourse teacherData={teacherData} />}
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
