import React from "react";

import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/ProfileCard/profileCard.component";

import "./adminCourse.page.css";

const AdminCourse: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="admin-course__container">
        <aside></aside>
        <main className="admin-course">
          <ProfileCard />
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
