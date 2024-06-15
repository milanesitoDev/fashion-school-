
import { Link } from 'react-router-dom'
import './login.page.css'
import React, { FC, useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import  {AxiosError} from "axios";

interface LoginProps {}


const LOGIN_URL = '/login';

const Login: FC<LoginProps> = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log(JSON.stringify({  'email' : user,
                'password' : pwd,}))
           /* const response = await axios.post(LOGIN_URL,
               // JSON.stringify({ "email":"john@example.com", "password": "password123" }),
               //{ body: JSON.stringify({ user, pwd }) },
                //JSON.stringify({ user, pwd }),
                {params : JSON.stringify({ email:'prueba@example.com', password:'cb7327dd' })},
                {
                    
                    headers: { 'Content-Type': 'application/json', 
                        'Access-Control-Allow-Origin': '*'
                    },
                    withCredentials: true
               
                }
            );*/
            const response = await axios.post(LOGIN_URL,{
                'email' : user,
                'password' : pwd,
              });

           console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (e) {
            const error = e as AxiosError;
            if (error.isAxiosError) {
               // console.error(error.response?.status);
                if(error.response?.status === 400){console.log('Missing Username or Password');}
                if(error.response?.status === 401){console.log('Unauthorized');}
              } else {
                console.error(error,setErrMsg(' -> Login Failed'));
              }
            
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    return(
        <div className="login__container">
            <div className="login">
                <img className='login__logo' src="images/saint-logo.png" alt="Saint College Logo" />
                <div className="login__form-container">
                    <h2 className='login__form-title'>¡Bienvenidos!</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
      {errMsg}
    </p>
                    <form action="" className="login__form"  onSubmit={handleSubmit}>
                     
                        <input
                            type="email"
                            id="username"
                            name='email'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                            value={user}
                            placeholder='Correo Electronico'
                            required
                        />
                       
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
                            value={pwd}
                            placeholder='Contraseña'
                            required
                        />
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