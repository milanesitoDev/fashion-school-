import React, { useState } from "react";
import axios from "axios";

const CHANGE_PASSWORD_URL = 'http://18.222.67.121/api/users';

interface ChangeUserPasswordProps {
  userId: number;
}

const ChangeUserPassword: React.FC<ChangeUserPasswordProps> = ({ userId }) => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      const response = await axios.post(`${CHANGE_PASSWORD_URL}/${userId}/change_password`, {
        password: password,
      });

      if (response.status === 200) {
        setMessage("Password changed successfully");
      } else {
        setMessage("Failed to change password");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Validation error: " + JSON.stringify(error.response.data));
          } else if (error.response.status === 404) {
            setMessage("User not found");
          } else if (error.response.status === 500) {
            setMessage("Internal server error: " + error.response.data.error);
          } else {
            setMessage("An error occurred: " + error.message);
          }
        } else {
          setMessage("An error occurred: " + error.message);
        }
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Change User Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            New Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeUserPassword;