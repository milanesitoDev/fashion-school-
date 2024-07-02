import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../navbar/navbar.component";
import AdminTeacher from "../../pages/adminTeacher/adminTeacher.page";
import AdminStudents from "../../pages/adminStudents/adminStudents.page";
import AdminUpFile from "../../pages/adminUpFile/adminUpFile.page";
import AdminQualifications from "../../pages/adminQualifications/adminQualifications.page";
import Home from "../../pages/home/home.page";
import Invoicing from "../../pages/invoicing/invoicing";

export const SchoolRoutes: React.FC = () => {
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
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/incio" element={<Home />} />
          <Route
            path="/students"
            element={<AdminStudents teacherData={teacherData} />}
          />
          
          <Route
            path="/teachers"
            element={<AdminTeacher teacherData={teacherData} />}
          />
          <Route
            path="/administration"
            element={<AdminUpFile teacherData={teacherData} />}
          />
          <Route
            path="/adminqualifications"
            element={<AdminQualifications teacherData={teacherData} />}
          />
          <Route path="/" element={<Navigate to="/incio" />} />
        </Routes>
      </div>
    </>
  );
};
