import React from "react";

import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/ProfileCard/profileCard.component";

import "./adminCalendar.page.css";

const AdminCalendar: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="admin-calendar__container">
        <aside></aside>
        <main className="admin-calendar">
          <ProfileCard />
          <div className="admin-calendar__info">
            <h2 className="admin-calendar__name">Nombre de la carrera</h2>
            <ul className="admin-calendar__list">
              <li>Curso</li>
              <li>Estudiantes</li>
              <li className="list--bold">Calificaciones</li>
            </ul>
            <p className="admin-calendar__month">mayo 2024</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminCalendar;
