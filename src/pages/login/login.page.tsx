import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.page.css";
import axios, { AxiosError } from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
    e.preventDefault();
    setMessage("");
    console.log('API URL:', process.env.REACT_APP_API_URL);
    try {
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });
  
      console.log("Login response:", response.data);
  
      if (response.status === 200) {
        setMessage("User logged in successfully");
        console.log("User role:", response.data.role);

      } else {
        setMessage("Login failed: " + response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Axios error:", axiosError);
  
        if (axiosError.response && axiosError.response.status === 401) {
          setMessage("Incorrect credentials. Please check your email and password.");
        } else {
          setMessage("An error occurred: " + axiosError.message);
        }
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="login__container">
      <div className="login">
        <img className='login__logo' src="images/saint-logo.png" alt="Saint College Logo" />
        <div className="login__form-container">
          <h2 className='login__form-title'>¡Bienvenidos!</h2>
          <form className="login__form" onSubmit={handleLogin}>
            <input
              type="email"
              name='email'
              placeholder='Correo Electronico'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder='Contraseña'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link className='login__form-link' to="/register">Registrarse</Link>
            <input type="submit" value="Ingresar" />
          </form>
          {message && <p>{message}</p>}
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
