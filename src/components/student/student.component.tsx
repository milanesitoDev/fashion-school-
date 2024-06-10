import "./student.component.css";

const Student: React.FC = () => {
  return (
    <div className="student">
      <img src="images/profile.jpg" alt="Profile" />
      <div className="student__info">
        <p className="student__name">Carlos Perez</p>
        <p className="student__text">Diseño 1</p>
      </div>
      <div className="student__mail">
        <i className="icon bx bx-envelope"></i>
      </div>
    </div>
  );
};

export default Student;
