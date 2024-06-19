import React from "react";

import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/ProfileCard/profileCard.component";

import "./adminQualifications.page.css";

const AdminQualifications: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="admin-qualifications__container">
        <aside></aside>
        <main className="admin-qualifications">
          <ProfileCard />
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
            <tr>
              <th>Nombre / Apellido</th>
              <th>Nombre de usuario</th>
              <th>Direccion de correo</th>
              <th>Nota del curso</th>
            </tr>
            <tr>
              <td>Maria Guadalupe Tineo</td>
              <td>@Guadatineo</td>
              <td>Guadalupetineo@gmail.com</td>
              <td>18/20</td>
            </tr>
            <tr>
              <td>Maria Guadalupe Tineo</td>
              <td>@Guadatineo</td>
              <td>Guadalupetineo@gmail.com</td>
              <td>18/20</td>
            </tr>
            <tr>
              <td>Maria Guadalupe Tineo</td>
              <td>@Guadatineo</td>
              <td>Guadalupetineo@gmail.com</td>
              <td>18/20</td>
            </tr>
            <tr>
              <td>Maria Guadalupe Tineo</td>
              <td>@Guadatineo</td>
              <td>Guadalupetineo@gmail.com</td>
              <td>18/20</td>
            </tr>
            <tr>
              <td>Maria Guadalupe Tineo</td>
              <td>@Guadatineo</td>
              <td>Guadalupetineo@gmail.com</td>
              <td>18/20</td>
            </tr>
          </table>
        </main>
      </div>
    </>
  );
};

export default AdminQualifications;
