import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.component.css'

const Navbar: React.FC = () => {
    return(
        <div className="navbar">
            <div className="navbar__logo">
                <img src="images/saint-logo.png" alt="Logo" />
            </div>
            <nav className="navbar__nav">
                <ul>
                    <li><Link className='nav__link nav--focus' to={"/"}>Inicio</Link></li>
                    <li><Link className='nav__link' to={"/students"}>Estudiantes</Link></li>
                    <li><Link className='nav__link' to={"/teachers"}>Profesores</Link></li>
                    <li><Link className='nav__link' to={"/billing"}>Facturacion</Link></li>
                    <li><Link className='nav__link' to={"/administration"}>Administracion</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar