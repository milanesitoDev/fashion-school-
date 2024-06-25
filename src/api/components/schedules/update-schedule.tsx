import React, { useState } from 'react';
import axios from 'axios';

const PATCH_SCHEDULE_URL = 'http://18.222.67.121/api/schedule';

const UpdateSchedule: React.FC = () => {
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [startHour, setStartHour] = useState<string>('');
  const [endHour, setEndHour] = useState<string>('');
  const [message, setMessage] = useState<string>("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleId(Number(e.target.value));
  };

  const handleStartHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartHour(e.target.value);
  };

  const handleEndHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndHour(e.target.value);
  };

  const handleUpdateSchedule = async () => {
    setMessage("");

    if (scheduleId === null || !startHour || !endHour) {
      setMessage("Please enter valid schedule details");
      return;
    }

    try {
      const response = await axios.patch(`${PATCH_SCHEDULE_URL}/${scheduleId}`, {
        start_hour: startHour,
        end_hour: endHour
      });

      if (response.status === 200) {
        setMessage("Schedule updated successfully");
      } else {
        setMessage("Failed to update schedule");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Bad request: " + error.response.data.error);
          } else if (error.response.status === 404) {
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
      <h2>Update Schedule</h2>
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
      </div>
      <div>
        <label>
          Start Hour:
          <input
            type="datetime-local"
            name="startHour"
            value={startHour}
            onChange={handleStartHourChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          End Hour:
          <input
            type="datetime-local"
            name="endHour"
            value={endHour}
            onChange={handleEndHourChange}
            required
          />
        </label>
      </div>
      <button onClick={handleUpdateSchedule}>Update Schedule</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateSchedule;
