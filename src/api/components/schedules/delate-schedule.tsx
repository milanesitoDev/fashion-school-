import React, { useState } from 'react';
import axios from 'axios';

const DELETE_SCHEDULE_URL = 'http://18.222.67.121/api/schedule';

const DeleteSchedule: React.FC = () => {
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleId(Number(e.target.value));
  };

  const handleDeleteSchedule = async () => {
    setMessage("");

    if (scheduleId === null) {
      setMessage("Please enter a valid schedule ID");
      return;
    }

    try {
      const response = await axios.delete(`${DELETE_SCHEDULE_URL}/${scheduleId}`);

      if (response.status === 200) {
        setMessage("Schedule deleted successfully");
      } else {
        setMessage("Failed to delete schedule");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Schedule not found");
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
      <h2>Delete Schedule</h2>
      <div>
        <label>
          Schedule ID:
          <input
            type="number"
            name="scheduleId"
            value={scheduleId || ''}
            onChange={handleIdChange}
            required
          />
        </label>
        <button onClick={handleDeleteSchedule}>Delete Schedule</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteSchedule;
