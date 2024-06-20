import React from "react";

import Navbar from "../../components/navbar/navbar.component";

import "./adminCalendar.page.css";
import ProfileCard from "../../components/profileCard/profileCard.component";
import CalendarFull from "../calendar/calendar-full";

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
            <CalendarFull/>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminCalendar;
