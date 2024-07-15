import React, { useState } from "react";
import axios from "axios";

const DELETE_USER_URL = 'http://18.222.67.121/api/users';

interface DeleteUserProps {
  userId: number;
}

const DelateUser: React.FC<DeleteUserProps> = ({ userId }) => {
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
      <h2 className="text-center text-lg font-medium">Delete User</h2>
      <button onClick={handleDelete} className=" mt-6 inline-block rounded border border-slate-500 px-12 py-3 text-sm font-medium text-slate-500 hover:bg-slate-600 hover:text-white focus:outline-none focus:ring active:bg-slate-500">Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DelateUser;
