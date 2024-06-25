import React, { useState } from "react";
import axios from "axios";

const UPDATE_USER_URL = 'http://18.222.67.121/api/users';

interface UpdateUserProps {
  userId: number;
}

interface User {
  name: string;
  email: string;
  password: string;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ userId }) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.patch(`${UPDATE_USER_URL}/${userId}`, user);

      if (response.status === 200) {
        setMessage("User updated successfully");
      } else {
        setMessage("Failed to update user");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("User not found");
          } else if (error.response.status === 500) {
            setMessage("Error updating user: " + error.response.data.errors);
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
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Update User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUser;
