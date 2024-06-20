import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import axios from '../../../api/axios';
import "./register.page.css";

interface RegisterSuccessResponse {
  name: string;
  email: string;
  rol_id: number;
  password: string;
  image_url: string;
}

interface RegisterErrorResponse {
  message: string;
  status: number;
  data: string[]; // otra forma de datos de error que puedas recibir
}

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [message, setMessage] = React.useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data:any) => {
    setMessage("");

    const LOGIN_URL = '/users';

    try {
      const response = await axios.post<RegisterSuccessResponse>(LOGIN_URL, {
        name: data.name,
        email: data.email,
        rol_id: 3,
        password: data.password,
      });

      console.log("Register response:", response.data);

      if (response.status === 201) {
        setMessage("User registered successfully");
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error.isAxiosError) {
        const axiosError = error as AxiosError<RegisterErrorResponse>;
        console.error("Axios error:", axiosError);

        if (axiosError.response && axiosError.response.status === 400) {
          setMessage("Validation error: " + axiosError.response.data.message);
        } else if (axiosError.response && axiosError.response.status === 500) {
          setMessage("Error creating user: " + axiosError.response.data.message);
        } else {
          setMessage("An error occurred: " + axiosError.message);
        }
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="register__container">
      <div className="register">
        <img className='register__logo' src="images/saint-logo.png" alt="Saint College Logo" />
        <div className="register__form-container">
          <h2 className='register__form-title'>Registrarse</h2>
          <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", { required: true })}
              type="text"
              name='name'
              placeholder='Name'
            />
            {errors.name && <p>Name is required</p>}
            <input
              {...register("email", { required: true })}
              type="email"
              name='email'
              placeholder='Email'
            />
            {errors.email && <p>Email is required</p>}
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              placeholder='Password'
            />
            {errors.password && <p>Password is required</p>}
            <input type="submit" value="Register" />
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className="register__side-banner">
        <div className="side-banner__box">
          <h2>La Mejor</h2>
          <h3>Universidad de diseño!</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, eius!</p>
        </div>
      </div>
    </div>
  );
}

export default Register;