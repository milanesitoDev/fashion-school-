import Student from "../student/student.component";

import "./students.component.css";

type student = {
  name: string;
};

interface StudentsProps {
  students: student[];
}

const Students: React.FC<StudentsProps> = ({ students }) => {
  return (
    <div className="students">
      <div className="students__wrapper">
        <div className="wrapper__text">
          <h3 className="students__title">Estudiantes</h3>
          <p className="students__text">
            Tienes <span className="text-number">{students.length}</span>
            <span className="text-students"> estudiantes</span>
          </p>
        </div>
        <div className="wrapper__btn">
          <i className="icon bx bx-plus"></i>
        </div>
      </div>
      <div className="students__list">
        {students.map((student) => {
          return <Student student={student} />;
        })}
      </div>
      <button className="students__btn">Ver mas</button>
    </div>
  );
};

export default Students;
