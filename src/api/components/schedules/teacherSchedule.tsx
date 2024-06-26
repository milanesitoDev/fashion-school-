import React, { useState } from 'react';
import axios from 'axios';

const GET_SCHEDULE_URL = 'http://18.222.67.121/api/schedule/teacher';

const TeacherSchedule: React.FC = () => {
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherId(Number(e.target.value));
  };

  const handleGetSchedule = async () => {
    setMessage("");
    setSchedule([]);

    if (teacherId === null) {
      setMessage("Please enter a valid teacher ID");
      return;
    }

    try {
      const response = await axios.get(`${GET_SCHEDULE_URL}/${teacherId}`);

      if (response.status === 200) {
        setSchedule(response.data.data);
      } else {
        setMessage("Failed to retrieve schedule");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Teacher not found or has no schedule");
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
      <h2>Get Teacher Schedule</h2>
      <div>
        <label>
          Teacher ID:
          <input
            type="number"
            name="teacherId"
            value={teacherId || ''}
            onChange={handleIdChange}
            required
          />
        </label>
        <button onClick={handleGetSchedule}>Get Schedule</button>
      </div>
      {message && <p>{message}</p>}
      {schedule.length > 0 && (
        <div>
          <h3>Schedule:</h3>
          <ul>
            {schedule.map((item, index) => (
              <li key={index}>
                <strong>Course:</strong> {item.course}<br />
                <strong>Activity:</strong> {item.activity}<br />
                <strong>Start Hour:</strong> {item.start_hour}<br />
                <strong>End Hour:</strong> {item.end_hour}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeacherSchedule;
