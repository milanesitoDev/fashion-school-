import Student from "../student/student.component";

import "./students.component.css";

const Students: React.FC = () => {
  return (
    <div className="students">
      <div className="students__wrapper">
        <div className="wrapper__text">
          <h3 className="students__title">Estudiantes</h3>
          <p className="students__text">
            Tienes <span className="text-number">5</span> estudiantes
          </p>
        </div>
        <div className="wrapper__btn">
          <i className="icon bx bx-plus"></i>
        </div>
      </div>
      <div className="students__list">
        <Student />
        <Student />
        <Student />
        <Student />
      </div>
      <button className="students__btn">Ver mas</button>
    </div>
  );
};

export default Students;
