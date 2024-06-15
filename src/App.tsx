import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.page";
import Login from "./pages/login/login.page";
import AdminTeacher from "./pages/adminTeacher/adminTeacher.page";
import AdminQualifications from "./pages/adminQualidications/adminQualifications.page";
import AdminCalendar from "./pages/adminCalendar/adminCalendar.page";
import AdminUpFile from "./pages/adminUpFile/adminUpFile.page";
import AdminStudents from "./pages/adminStudents/adminStudents.page";
import AdminCourse from "./pages/adminCourse/adminCourse.page";

import "./App.css";

function App() {
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

export default App;
