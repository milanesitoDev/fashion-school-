import React, { useState } from 'react';
import axios from 'axios';

const POST_CALIFICATION_URL = 'http://18.222.67.121/api/califications';

const AddCalification: React.FC = () => {
  const [activityId, setActivityId] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [calification, setCalification] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleActivityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityId(Number(e.target.value));
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleCalificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalification(Number(e.target.value));
  };

  const handleAddCalification = async () => {
    setMessage("");

    if (activityId === null || studentId === null || calification === null) {
      setMessage("Please enter valid calification details");
      return;
    }

    try {
      const response = await axios.post(POST_CALIFICATION_URL, {
        activity_id: activityId,
        student_id: studentId,
        calification: calification
      });

      if (response.status === 201) {
        setMessage("Calification created successfully");
      } else {
        setMessage("Failed to create calification");
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
      <h2>Add Calification</h2>
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
          Calification:
          <input
            type="number"
            step="0.1"
            name="calification"
            value={calification || ''}
            onChange={handleCalificationChange}
            required
          />
        </label>
      </div>
      <button onClick={handleAddCalification}>Add Calification</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCalification;
