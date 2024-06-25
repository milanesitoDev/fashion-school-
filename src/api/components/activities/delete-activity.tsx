import React, { useState } from "react";
import axios from "axios";

const DELETE_ACTIVITY_URL = 'http://18.222.67.121/api/activities';

interface DeleteActivityProps {
  activityId: number;
}

const DeleteActivity: React.FC<DeleteActivityProps> = ({ activityId }) => {
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    setMessage("");
    try {
      const response = await axios.delete(`${DELETE_ACTIVITY_URL}/${activityId}`);

      if (response.status === 200) {
        setMessage("Activity deleted successfully");
      } else {
        setMessage("Failed to delete activity");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Activity not found");
          } else if (error.response.status === 500) {
            setMessage("Internal server error");
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
      <h2>Delete Activity</h2>
      <button onClick={handleDelete}>Delete Activity</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteActivity;
