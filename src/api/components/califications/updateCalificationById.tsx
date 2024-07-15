import React, { useState } from 'react';
import axios from 'axios';

const UPDATE_CALIFICATION_URL = 'http://18.222.67.121/api/califications';

const UpdateCalificationById: React.FC = () => {
  const [calificationId, setCalificationId] = useState<number | null>(null);
  const [newCalification, setNewCalification] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleCalificationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalificationId(Number(e.target.value));
  };

  const handleNewCalificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCalification(Number(e.target.value));
  };

  const handleUpdateCalification = async () => {
    setResponseMessage("");

    if (calificationId === null || newCalification === null) {
      setResponseMessage("Please enter valid calification details");
      return;
    }

    try {
      const response = await axios.post(`${UPDATE_CALIFICATION_URL}/${calificationId}`, {
        calification: newCalification
      });

      if (response.status === 200) {
        setResponseMessage("Calification updated successfully");
      } else {
        setResponseMessage("Failed to update calification");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setResponseMessage(`Error: ${error.response.data.error}`);
        } else {
          setResponseMessage(`An error occurred: ${error.message}`);
        }
      } else {
        setResponseMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Update Calification by ID</h2>
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
      <div>
        <label>
          New Calification:
          <input
            type="number"
            step="0.1"
            name="newCalification"
            value={newCalification || ''}
            onChange={handleNewCalificationChange}
            required
          />
        </label>
      </div>
      <button onClick={handleUpdateCalification}>Update Calification</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateCalificationById;
