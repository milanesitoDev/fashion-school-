import React from "react";
import { NavLink } from "react-router-dom";

import "./navbar.component.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src="images/saint-logo.png" alt="Logo" />
      </div>
      <nav className="navbar__nav">
        <ul>
          <li>
            <NavLink className="nav__link nav--focus" to={"/"}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to={"/adminstudents"}>
              Estudiantes
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to={"/adminteacher"}>
              Profesores
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to={"/billing"}>
              Facturacion
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to={"/adminupfile"}>
              Administracion
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to={"/adminqualifications"}>
              Calificaciones
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;