import React, { useState } from 'react';
import axios from 'axios';

const GET_CALIFICATION_BY_ID_URL = 'http://18.222.67.121/api/califications';

interface CalificationData {
  id: number;
  activity_id: number;
  student_id: number;
  calification: number;
  created_at: string;
  updated_at: string;
}

const GetCalificationById: React.FC = () => {
  const [calificationId, setCalificationId] = useState<number | null>(null);
  const [data, setData] = useState<CalificationData | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleCalificationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalificationId(Number(e.target.value));
  };

  const handleGetCalification = async () => {
    setMessage("");
    setData(null);

    if (calificationId === null) {
      setMessage("Please enter a valid calification ID");
      return;
    }

    try {
      const response = await axios.get(`${GET_CALIFICATION_BY_ID_URL}/${calificationId}`);

      if (response.status === 200) {
        setData(response.data.data);
        setMessage("Calification retrieved successfully");
      } else {
        setMessage("Failed to retrieve calification");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage(`Error: ${error.response.data.error}`);
        } else {
          setMessage(`An error occurred: ${error.message}`);
        }
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Get Calification by ID</h2>
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
      <button onClick={handleGetCalification}>Get Calification</button>
      {message && <p>{message}</p>}
      {data && (
        <div>
          <h3>Calification Info</h3>
          <p>ID: {data.id}</p>
          <p>Activity ID: {data.activity_id}</p>
          <p>Student ID: {data.student_id}</p>
          <p>Calification: {data.calification}</p>
          <p>Created At: {data.created_at}</p>
          <p>Updated At: {data.updated_at}</p>
        </div>
      )}
    </div>
  );
};

export default GetCalificationById;
