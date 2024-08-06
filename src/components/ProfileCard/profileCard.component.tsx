import React, { useState, useContext  } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChangeUserImage from "../../api/components/users/changeUserImage";
import useAuth from '../../context/AuthProvider';
import "./profileCard.component.css";

type Teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};

interface ProfileCardProps {
  teacherData: Teacher;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ teacherData }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("../images/profile.jpg");

  const data = useContext(useAuth);

  const onLogout = () => {
    navigate("/login", {
      replace: true,
    });
  };
//  <ChangeUserImage userId={1} onImageChange={setImageUrl} />
  return (
    <div className="profile-card">
      <div className="profile-card__image">
        <img src={imageUrl} alt="Profile" />
      </div>
     
      <div className="profile-card__buttons">
        <i className="bx bxs-camera-movie"></i>
        <i className="bx bxs-bell btn--notification"></i>
        <i className="bx bxs-envelope btn--notification"></i>
        <div className="buttons__menu">
          <label htmlFor="menu">
            <i className="bx bx-menu"></i>
          </label>
          <input type="checkbox" id="menu" />
          <ul className="buttons__dropdown">
            <li>
              <Link className="dropdown__link" to="/adminteacher">
                Perfil
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/teacher/calification">
                Calificaciones
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/teacher/calendar">
                Calendario
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/adminupfile">
                Archivos
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/adminstudents">
                Estudiantes
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/admincourse">
                Cambiar rol a "empty"
              </Link>
            </li>
            <li>
              <button className="dropdown__link" onClick={onLogout}>
                Cerrar sesion
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-card__name">
        <h2>{data.auth.userName}</h2>
      </div>
      <div className="profile-card__info">
        <div className="info__wrapper info--main">
          <p className="info__title">Profesor</p>
          <div className="info__data">
            <i className="icon bx bx-location-plus"></i>
            <p>{teacherData.location}</p>
          </div>
        </div>
        <div className="info__wrapper">
          <p className="info__title">Telefono</p>
          <div className="info__data">
            <i className="icon bx bx-phone"></i>
            <p>{teacherData.phone}</p>
          </div>
        </div>
        <div className="info__wrapper">
          <p className="info__title">Email</p>
          <div className="info__data">
            <i className="icon bx bx-envelope"></i>
            <p>{data.auth.user}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
