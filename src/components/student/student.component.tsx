import "./student.component.css";

type student = {
  name: string;
};

interface StudentProps {
  student: student;
}

const Student: React.FC<StudentProps> = ({ student }) => {
  return (
    <div className="student">
      <img src="images/profile.jpg" alt="Profile" />
      <div className="student__info">
        <p className="student__name">{student.name}</p>
        <p className="student__text">Diseño 1</p>
      </div>
      <div className="student__mail">
        <i className="icon bx bx-envelope"></i>
      </div>
    </div>
  );
};

export default Student;
