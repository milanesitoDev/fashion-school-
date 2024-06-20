import React, { useState, useEffect } from "react";
import axios from "axios";

const GET_USER_URL = 'http://18.222.67.121/api/users';

interface User {
  id: number;
  name: string;
  email: string;
  id_rol: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface GetUserProps {
  userId: number;
}

const GetUser: React.FC<GetUserProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      setMessage("");

      try {
        const response = await axios.get(`${GET_USER_URL}/${userId}`);

        if (response.status === 200) {
          setUser(response.data[0]);
        } else {
          setMessage("Failed to retrieve user");
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

    fetchUser();
  }, [userId]);

  return (
    <div>
      <h2>User Details</h2>
      {message && <p>{message}</p>}
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role ID:</strong> {user.id_rol}</p>
          <p><strong>Image URL:</strong> <a href={user.image_url}>{user.image_url}</a></p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetUser;
