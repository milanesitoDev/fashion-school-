import React, { useState } from 'react';
import axios from 'axios';

const UPDATE_CALIFICATION_URL = 'http://18.222.67.121/califications';

// Definir el tipo de datos esperados
interface UpdateCalificationResponse {
  message: string;
  status: number;
  data: {
    id: number;
    value: number;
  };
}

const UpdateCalificationById: React.FC = () => {
  const [calificationId, setCalificationId] = useState<number | null>(null);
  const [newCalificationValue, setNewCalificationValue] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleCalificationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalificationId(Number(e.target.value));
  };

  const handleNewCalificationValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCalificationValue(Number(e.target.value));
  };

  const handleUpdateCalification = async () => {
    setResponseMessage("");

    if (calificationId === null || newCalificationValue === null) {
      setResponseMessage("Please enter valid calification ID and value");
      return;
    }

    try {
      const response = await axios.post<UpdateCalificationResponse>(
        `${UPDATE_CALIFICATION_URL}/${calificationId}`,
        {
          value: newCalificationValue
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setResponseMessage("Calification updated successfully");
      } else {
        setResponseMessage("Failed to update calification");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage("Calification not found");
          } else if (error.response.status === 400) {
            setResponseMessage("Invalid input");
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
          New Calification Value:
          <input
            type="number"
            name="newCalificationValue"
            value={newCalificationValue || ''}
            onChange={handleNewCalificationValueChange}
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
