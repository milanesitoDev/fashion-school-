import './login.page.css';
import React, { FC, useRef, useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { AxiosError } from "axios";
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';



interface LoginProps {}

const LOGIN_URL = '/login';

export const Login: FC<LoginProps> = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
   
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
   
    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, {
                'email': user,
                'password': pwd,
            });

            console.log(JSON.stringify(response?.data));
            // const accessToken = response?.data?.accessToken;
            const roles = response?.data?.rol;
            const from: string = routes_api(roles);
            
            function routes_api(param: string): string {
                console.log(param);
                switch(param) {                    
                    case 'admin':
                    return location.state?.from?.pathname || "/admintupfile"; //admintupfile
                    case 'student':
                    return location.state?.from?.pathname || "/adminstudents";
                    case 'teacher':
                    return location.state?.from?.pathname || "/adminteacher"; 
                  default:
                    return location.state?.from?.pathname || "/login";
                }
              }
           
            setAuth({ user, pwd, roles });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
            
        } catch (e) {
            const error = e as AxiosError;
            if (error.isAxiosError) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrMsg('Missing Username or Password');
                    } else if (error.response.status === 401) {
                        setErrMsg('Unauthorized');
                    } else {
                        setErrMsg('An error occurred: ' + error.message);
                    }
                } else {
                    setErrMsg('An error occurred: ' + error.message);
                }
            } else {
                setErrMsg('An unexpected error occurred');
            }

            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    return (
        <div className="login__container">
            <div className="login">
                <img className="login__logo" src="images/saint-logo.png" alt="Saint College Logo" />
                <div className="login__form-container">
                    <h2 className="login__form-title">¡Bienvenidos!</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electronico"
                            required
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            ref={userRef}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            required
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                        <div>
                            <Link className="login__form-link" to={"/forgotpassword"}>¿Olvidaste tu contraseña?</Link>
                            <Link className="register__form-link" to="/register">Registrarse</Link>
                        </div>
                        <input type="submit" value="Ingresar" />
                    </form>
                </div>
                <div className="login__links">
                    <div className="login__link">
                        <img src="images/google-icon.png" alt="Google Icon" />
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
    );
}

export default Login;
