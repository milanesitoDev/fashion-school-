import React from "react";

import ProfileCard  from "../../components/ProfileCard/profileCard.component";
import Navbar from "../../components/navbar/navbar.component";

import "./adminQualifications.page.css";

type teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};

type qualifications = {
  name: string;
  username: string;
  email: string;
  value: number[];
};
interface AdminQualificationsProps {
  teacherData: teacher;
  qualificationsData: qualifications[];
}

const AdminQualifications: React.FC<AdminQualificationsProps> = ({
  teacherData,
  qualificationsData,
}) => {
  return (
    <>
      <Navbar />
      <div className="admin-qualifications__container">
        <aside></aside>
        <main className="admin-qualifications">
          <ProfileCard teacherData={teacherData} />
          <div className="admin-qualifications__info">
            <h2 className="admin-qualifications__name">Nombre de la carrera</h2>
            <ul className="admin-qualifications__list">
              <li>Curso</li>
              <li>Estudiantes</li>
              <li className="list--bold">Calificaciones</li>
            </ul>
            <p className="admin-qualifications__value">Informe de la nota</p>
            <p className="admin-qualifications__subject">
              Nombre de la materia
            </p>
            <form action="" className="admin-qualifications__form">
              <label htmlFor="students">Filtrar por nombre</label>
              <div className="form__input">
                <input
                  type="text"
                  name="students"
                  placeholder="Buscar estudiantes"
                  required
                />
                <button type="submit">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            </form>
          </div>
          <table className="admin-qualifications__table">
            <thead>
              <tr>
                <th>Nombre / Apellido</th>
                <th>Nombre de usuario</th>
                <th>Dirección de correo</th>
                <th>Nota del curso</th>
              </tr>
            </thead>
            <tbody>
              {qualificationsData.map((qualification) => {
                return (
                  <tr>
                    <td>{qualification.name}</td>
                    <td>@{qualification.username}</td>
                    <td>{qualification.email}</td>
                    <td>{`${qualification.value[0]}/${qualification.value[1]}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default AdminQualifications;