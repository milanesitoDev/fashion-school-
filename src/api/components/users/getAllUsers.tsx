import React, { useState, useEffect } from "react";
import axios from "axios";

const GET_USERS_URL = 'http://18.222.67.121/api/users';

interface User {
  id: number;
  name: string;
  email: string;
  rol_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const GetAllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setMessage("");

      try {
        const response = await axios.get(GET_USERS_URL);

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setMessage("Failed to retrieve users");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setMessage("Users not found");
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

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-center text-lg font-medium" >All Users</h2>
      {message && <p>{message}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role ID:</strong> {user.rol_id}</p>
              <p><strong>Image URL:</strong> <a href={user.image_url}>{user.image_url}</a></p>
              <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetAllUsers;
