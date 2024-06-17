import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.page";
import AdminTeacher from "./pages/adminTeacher/adminTeacher.page";
import AdminQualifications from "./pages/adminQualifications/adminQualifications.page";
import AdminCalendar from "./pages/adminCalendar/adminCalendar.page";
import AdminUpFile from "./pages/adminUpFile/adminUpFile.page";
import AdminStudents from "./pages/adminStudents/adminStudents.page";
import AdminCourse from "./pages/adminCourse/adminCourse.page";
import ForgotPassword from "./auth/pages/forgotPass/forgotPassword.page";
import Register from "./auth/pages/register/register.pages";
import Login from "./auth/pages/login/login.page";

import "./App.css";
import RetrieveStudents from "./api/components/students/retrieve-students";


function App() {
  type teacher = {
    name: string;
    location: string;
    phone: string;
    email: string;
  };

  type student = {
    name: string;
  };

  type message = {
    text: string;
    time: Date;
  };

  type chat = {
    chat: string;
    messages: message[];
  };

  type qualifications = {
    name: string;
    username: string;
    email: string;
    value: number[];
  };

  const teacherData: teacher = {
    name: "Juan Carlos",
    location: "DF, México",
    phone: "+12 345 6789 0",
    email: "juancarlosabc@mail.com",
  };

  const studentsData: student[] = [
    {
      name: "Carlos Perez",
    },
    {
      name: "Julia Tineo",
    },
    {
      name: "Luis Marcano",
    },
  ];

  const messagesData: chat[] = [
    {
      chat: "Carlos Perez",
      messages: [
        {
          text: "Hola, como andas?",
          time: new Date(),
        },
      ],
    },
    {
      chat: "Julia Tineo",
      messages: [
        {
          text: "Hola, como andas?",
          time: new Date(),
        },
        {
          text: "Todo bien?",
          time: new Date(),
        },
      ],
    },
  ];

  const qualificationsData: qualifications[] = [
    {
      name: "Maria Guadalupe Tineo",
      username: "Lupemariatineo",
      email: "Marialupe@mail.com",
      value: [18, 20],
    },
    {
      name: "Maria Guadalupe Tineo",
      username: "Lupemariatineo",
      email: "Marialupe@mail.com",
      value: [18, 20],
    },
    {
      name: "Maria Guadalupe Tineo",
      username: "Lupemariatineo",
      email: "Marialupe@mail.com",
      value: [18, 20],
    },
    {
      name: "Maria Guadalupe Tineo",
      username: "Lupemariatineo",
      email: "Marialupe@mail.com",
      value: [18, 20],
    },
    {
      name: "Maria Guadalupe Tineo",
      username: "Lupemariatineo",
      email: "Marialupe@mail.com",
      value: [18, 20],
    },
    {
      name: "Maria Guadalupe Tineo",
      username: "Lupemariatineo",
      email: "Marialupe@mail.com",
      value: [18, 20],
    },
  ];

  return (
    <Router>
      <Routes>
        <Route
          path="/admincourse"
          element={<AdminCourse teacherData={teacherData} />}
        ></Route>
        <Route path="/Recoveractivities" element={<RetrieveStudents/>}></Route>
        <Route
          path="/adminstudents"
          element={<AdminStudents teacherData={teacherData} />}
        ></Route>
        <Route
          path="/adminupfile"
          element={<AdminUpFile teacherData={teacherData} />}
        ></Route>
        <Route
          path="/admincalendar"
          element={<AdminCalendar teacherData={teacherData} />}
        ></Route>
        <Route
          path="/adminqualifications"
          element={
            <AdminQualifications
              teacherData={teacherData}
              qualificationsData={qualificationsData}
            />
          }
        ></Route>
        <Route
          path="/adminteacher"
          element={
            <AdminTeacher
              teacherData={teacherData}
              students={studentsData}
              messages={messagesData}
            />
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
