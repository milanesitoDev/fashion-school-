import React from "react";

import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/profileCard/profileCard.component";

import "./adminUpFile.page.css";

type teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};
interface AdminUpFileProps {
  teacherData: teacher;
}

const AdminUpFile: React.FC<AdminUpFileProps> = ({ teacherData }) => {
  return (
    <>
      <Navbar />
      <main className="admin-upfile">
        <ProfileCard teacherData={teacherData} />
        <div className="admin-upfile__info">
          <h2 className="admin-upfile__name">Nombre de la carrera</h2>
          <ul className="admin-upfile__list">
            <li>Curso</li>
            <li>Estudiantes</li>
            <li className="list--bold">Calificaciones</li>
          </ul>
        </div>
        <form action="" className="admin-upfile__form">
          <div className="upfile__form-wrapper">
            <h3 className="upfile__form-title">
              Configuracion del curso general
            </h3>
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-name">Nombre completo del curso</label>
            <input type="text" name="course-name" id="course-name" required />
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-shortname">Nombre corto del curso</label>
            <input
              type="text"
              name="course-shortname"
              id="course-shortname"
              required
            />
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-categories">Categoria de cursos</label>
            <input
              type="text"
              name="course-categories"
              id="course-categories"
              required
            />
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-visibility">Visibilidad del curso</label>
            <input
              type="text"
              name="course-visibility"
              id="course-visibility"
              required
            />
          </div>
          <div className="upfile__form-wapper">
            <span></span>
            <input type="number" id="course" />
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-startdate">Fecha de inicio del curso</label>
            <div className="upfile__form-startdate">
              <input type="number" name="course-startdate" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <i className="cal-icon bx bxs-calendar"></i>
            </div>
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-enddate">
              Fecha de finalizacion del curso
            </label>
            <div className="upfile__form-enddate">
              <input type="checkbox" name="course-enddate" id="" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <i className="cal-icon bx bxs-calendar-event"></i>
            </div>
          </div>
          <div className="upfile__form-wapper">
            <label htmlFor="course-id">Numero ID del curso</label>
            <input type="number" name="course-id" id="course-id" required />
          </div>
          <div className="upfile__form-wapper">
            <h4 className="upfile__description-title">Descripcion</h4>
            <div className="upfile__form-description">
              <label htmlFor="course-description">Resumen del curso</label>
              <textarea
                name="course-description"
                id="course-description"
                required
              ></textarea>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AdminUpFile;
