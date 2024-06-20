import React, { useState } from "react";
import axios from "axios";

const DELETE_USER_URL = 'http://18.222.67.121/api/users';

interface DeleteUserProps {
  userId: number;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    setMessage("");

    try {
      const response = await axios.delete(`${DELETE_USER_URL}/${userId}`);

      if (response.status === 200) {
        setMessage("User deleted successfully");
      } else {
        setMessage("Failed to delete user");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("User not found");
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
      <h2>Delete User</h2>
      <button onClick={handleDelete}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUser;
