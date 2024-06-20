import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import "./forgotPassword.page.css";

interface ForgotPasswordResponse {
  message: string;
  status: number;
  new_password?: string;
  error?: string;
}

interface IFormInput {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setMessage("");

    try {
      const response = await axios.post<ForgotPasswordResponse>(`${process.env.REACT_APP_API_URL}/retrieve_password`, {
        email: data.email,
      });

      console.log("Forgot password response:", response.data);

      if (response.status === 200) {
        setMessage(`New password sent successfully. Your new password is: ${response.data.new_password}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ForgotPasswordResponse>;
        console.error("Axios error:", axiosError);

        if (axiosError.response && axiosError.response.status === 404) {
          setMessage("User not found");
        } else if (axiosError.response && axiosError.response.status === 500) {
          setMessage("Error sending email");
        } else {
          setMessage("An error occurred: " + axiosError.message);
        }
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="forgot-password__container">
      <div className="forgot-password">
        <img className='forgot-password__logo' src="images/saint-logo.png" alt="Saint College Logo" />
        <div className="forgot-password__form-container">
          <h2 className='forgot-password__form-title'>Generar nueva contraseña</h2>
          <form className="forgot-password__form" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && <p>Email is required</p>}
            <input type="submit" value="Submit" />
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className="forgot-password__side-banner">
        <div className="side-banner__box">
          <h2>La Mejor</h2>
          <h3>Universidad de diseño!</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, eius!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;