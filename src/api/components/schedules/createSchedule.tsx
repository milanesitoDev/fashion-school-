import React, { useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const CREATE_SCHEDULE_URL = 'http://18.222.67.121/api/schedule';

const CreateSchedule: React.FC = () => {
  const [activityId, setActivityId] = useState<number | string>('');
  const [teacherId, setTeacherId] = useState<number | string>('');
  const [startHour, setStartHour] = useState<string>('');
  const [endHour, setEndHour] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleCreateSchedule = async () => {
    if (!activityId || !teacherId || !startHour || !endHour) {
      setMessage('Please fill out all fields.');
      return;
    }

    const scheduleData = {
      activity_id: activityId,
      teacher_id: teacherId,
      start_hour: format(parseISO(startHour), "dd-MM-yyyy HH:mm"),
      end_hour: format(parseISO(endHour), "dd-MM-yyyy HH:mm"),
    };

    try {
      const response = await axios.post(CREATE_SCHEDULE_URL, scheduleData);

      if (response.status === 201) {
        setMessage('Schedule created successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage('Error: ' + error.response.data.message);
        } else {
          setMessage('Error: ' + error.message);
        }
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Create New Schedule</h2>
      <div>
        <label>Activity ID:</label>
        <input
          type="number"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
        />
      </div>
      <div>
        <label>Teacher ID:</label>
        <input
          type="number"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
      </div>
      <div>
        <label>Start Hour:</label>
        <input
          type="datetime-local"
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
        />
      </div>
      <div>
        <label>End Hour:</label>
        <input
          type="datetime-local"
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
        />
      </div>
      <button onClick={handleCreateSchedule}>Create Schedule</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateSchedule;
