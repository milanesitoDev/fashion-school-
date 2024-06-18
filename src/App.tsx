//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { FC } from 'react';
import Home from "./pages/home/home.page";
import Login from "./pages/login/login.page";
import AdminTeacher from "./pages/adminTeacher/adminTeacher.page";
import AdminQualifications from "./pages/adminQualidications/adminQualifications.page";
import AdminCalendar from "./pages/adminCalendar/adminCalendar.page";
import AdminUpFile from "./pages/adminUpFile/adminUpFile.page";
import AdminStudents from "./pages/adminStudents/adminStudents.page";
import AdminCourse from "./pages/adminCourse/adminCourse.page";
import Unauthorized from './components/RouteProtected/Unauthorized';
//import Lounge from './components/Lounge';
//import LinkPage from './components/LinkPage';
import Layout from './components/RouteProtected/Layout';
import Missing from './components/RouteProtected/Missing';
import RequireAuth from './components/RouteProtected/RequireAuth';
import { Routes, Route } from 'react-router-dom';

import "./App.css";

interface Roles {
  Admin: string;  
  Estudent: string;
}
const ROLES: Roles = {
  Admin: "admin",
  Estudent: "editor",
};




const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/adminupfile" element={<AdminUpFile />} />  
        <Route path="/../unauthorized" element={<Unauthorized />} />
        <Route path="/adminteacher" element={<AdminTeacher />} />
       


        {/* Routes protected */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}  />}>
        <Route path="/adminstudents" element={<AdminStudents />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Estudent]} />}>
        <Route path="/admincourse" element={<AdminCourse />} />
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


/*function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admincourse" element={<AdminCourse />}></Route>
        <Route path="/adminstudents" element={<AdminStudents />}></Route>
        <Route path="/adminupfile" element={<AdminUpFile />}></Route>
        <Route path="/admincalendar" element={<AdminCalendar />}></Route>
        <Route
          path="/adminqualifications"
          element={<AdminQualifications />}
        ></Route>
        <Route path="/adminteacher" element={<AdminTeacher />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}
*/
export default App;
