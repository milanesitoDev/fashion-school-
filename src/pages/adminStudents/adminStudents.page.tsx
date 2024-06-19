import React from "react";

import ProfileCard from "../../components/profileCard/profileCard.component";
import Navbar from "../../components/navbar/navbar.component";

import "./adminStudents.page.css";

type teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};
interface AdminStudentsProps {
  teacherData: teacher;
}

const AdminStudents: React.FC<AdminStudentsProps> = ({ teacherData }) => {
  return (
    <>
      <Navbar />
      <div className="admin-students__container">
        <aside></aside>
        <main className="admin-students">
          <ProfileCard teacherData={teacherData} />
          <div className="admin-students__info">
            <h2 className="admin-students__name">Nombre de la carrera</h2>
            <ul className="admin-students__list">
              <li>Curso</li>
              <li>Estudiantes</li>
              <li className="list--bold">Calificaciones</li>
            </ul>
            <p className="admin-students__value">Informe de la nota</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminStudents;