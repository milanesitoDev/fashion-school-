import React, { useState } from 'react';
import axios from 'axios';

const GET_CALIFICATIONS_URL = 'http://18.222.67.121/califications';

const GetCalifications: React.FC = () => {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [activityId, setActivityId] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState<string>("");

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleActivityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityId(Number(e.target.value));
  };

  const handleGetCalifications = async () => {
    setMessage("");
    setData(null);

    if (studentId === null || activityId === null) {
      setMessage("Please enter valid student and activity IDs");
      return;
    }

    try {
      const response = await axios.get(`${GET_CALIFICATIONS_URL}/${studentId}/activity/${activityId}`);

      if (response.status === 200) {
        setData(response.data.data);
        setMessage("Califications retrieved successfully");
      } else {
        setMessage("Failed to retrieve califications");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Bad request: " + error.response.data.error);
          } else if (error.response.status === 404) {
            setMessage("No califications found for this activity and student");
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
      <h2>Get Califications</h2>
      <div>
        <label>
          Student ID:
          <input
            type="number"
            name="studentId"
            value={studentId || ''}
            onChange={handleStudentIdChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Activity ID:
          <input
            type="number"
            name="activityId"
            value={activityId || ''}
            onChange={handleActivityIdChange}
            required
          />
        </label>
      </div>
      <button onClick={handleGetCalifications}>Get Califications</button>
      {message && <p>{message}</p>}
      {data && (
        <div>
          <h3>Activity Info</h3>
          <p>Course: {data["info activity"].course}</p>
          <p>Activity: {data["info activity"].activity}</p>
          <h3>Califications</h3>
          <ul>
            {data.califications.map((calification: any) => (
              <li key={calification.id}>
                Calification {calification.id}: {calification["calification 1"]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetCalifications;
