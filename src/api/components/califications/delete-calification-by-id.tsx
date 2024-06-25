import React, { useState } from 'react';
import axios from 'axios';

const DELETE_CALIFICATION_URL = 'http://18.222.67.121/califications';

const DeleteCalificationById: React.FC = () => {
  const [calificationId, setCalificationId] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleCalificationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalificationId(Number(e.target.value));
  };

  const handleDeleteCalification = async () => {
    setResponseMessage("");

    if (calificationId === null) {
      setResponseMessage("Please enter a valid calification ID");
      return;
    }

    try {
      const response = await axios.delete(
        `${DELETE_CALIFICATION_URL}/${calificationId}`
      );

      if (response.status === 200) {
        setResponseMessage("Calification deleted successfully");
      } else {
        setResponseMessage("Failed to delete calification");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage("Calification not found");
          } else {
            setResponseMessage("An error occurred: " + error.message);
          }
        } else {
          setResponseMessage("An error occurred: " + error.message);
        }
      } else {
        setResponseMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Delete Calification by ID</h2>
      <div>
        <label>
          Calification ID:
          <input
            type="number"
            name="calificationId"
            value={calificationId || ''}
            onChange={handleCalificationIdChange}
            required
          />
        </label>
      </div>
      <button onClick={handleDeleteCalification}>Delete Calification</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DeleteCalificationById;
