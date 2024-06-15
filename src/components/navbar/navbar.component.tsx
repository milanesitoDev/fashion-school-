import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import './navbar.component.css'


const Navbar: React.FC = () => {
    const navigate = useNavigate();
    
    const onLogout = () =>{
        navigate('/login',{
            replace:true
        })
    }
    return(
        <div className="navbar">
            <div className="navbar__logo">
                <img src="images/saint-logo.png" alt="Logo" />
            </div>
            <nav className="navbar__nav">
                <ul>
                    <li><NavLink className='nav__link nav--focus' to={"/"}>Inicio</NavLink></li>
                    <li><NavLink className='nav__link' to={"/AdminStudents"}>Estudiantes</NavLink></li>
                    <li><NavLink className='nav__link' to={"/AdminTeacher"}>Profesores</NavLink></li>
                    <li><NavLink className='nav__link' to={"/billing"}>Facturacion</NavLink></li>
                    <li><NavLink className='nav__link' to={"/AdminUpFile"}>Administracion</NavLink></li>
                    <li><NavLink className='nav__link' to={"/AdminQualifications"}>Calificaciones</NavLink></li>
                </ul>
                <button 
                        className='nav-item nav-link btn'
                        onClick={onLogout}
                        >Logout
                </button>
            </nav>
        </div>
    )
}

export default Navbar