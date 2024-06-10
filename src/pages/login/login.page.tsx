import React from 'react'
import { Link } from 'react-router-dom'

import './login.page.css'

const Login: React.FC = () => {
    return(
        <div className="login__container">
            <div className="login">
                <img className='login__logo' src="images/saint-logo.png" alt="Saint College Logo" />
                <div className="login__form-container">
                    <h2 className='login__form-title'>¡Bienvenidos!</h2>
                    <form action="" className="login__form">
                        <input type="email" name='email' placeholder='Correo Electronico' required/>
                        <input type="password" name="password" placeholder='Contraseña' required />
                        <Link className='login__form-link' to={"#"}>¿Olvidaste tu contraseña?</Link>
                        <input type="submit" value="Ingresar" />
                    </form>
                </div>
                <div className="login__links">
                    <div className="login__link">
                        <img src="images/google-icon.png" alt="Google Icon3" />
                        <p>Ingresar con e-mail</p>
                    </div>
                    <div className="login__link">
                        <img src="images/facebook-icon.png" alt="Facebook Icon" />
                        <p>Ingresar con facebook</p>
                    </div>
                </div>
            </div>
            <div className="login__side-banner">
                <div className="side-banner__box">
                    <h2>La Mejor</h2>
                    <h3>Universidad de diseño!</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, eius!</p>
                </div>
            </div>
        </div>
    )
}

export default Login