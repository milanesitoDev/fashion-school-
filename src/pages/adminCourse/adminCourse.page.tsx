import React from "react";

import ProfileCard from "../../components/profileCard/profileCard.component";
import Navbar from "../../components/navbar/navbar.component";

import "./adminCourse.page.css";

type teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};
interface AdminCourseProps {
  teacherData: teacher;
}

const AdminCourse: React.FC<AdminCourseProps> = ({ teacherData }) => {
  return (
    <>
      <Navbar />
      <div className="admin-course__container">
        <aside></aside>
        <main className="admin-course">
          <ProfileCard teacherData={teacherData} />
          <div className="admin-course__info">
            <h2 className="admin-course__name">Nombre de la carrera</h2>
            <ul className="admin-course__list">
              <li>Curso</li>
              <li>Estudiantes</li>
              <li className="list--bold">Calificaciones</li>
            </ul>
            <p className="admin-course__value">Informe de la nota</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminCourse;