import React from "react";

import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/ProfileCard/profileCard.component";

import "./adminStudents.page.css";

const AdminStudents: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="admin-students__container">
        <aside></aside>
        <main className="admin-students">
          <ProfileCard />
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
