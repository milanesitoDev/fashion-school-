import React, { useState } from 'react';
import axios from 'axios';

const GET_SCHEDULE_URL = 'http://18.222.67.121/api/schedule/student';

const StudentSchedule: React.FC = () => {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleGetSchedule = async () => {
    setMessage("");
    setSchedule([]);

    if (studentId === null) {
      setMessage("Please enter a valid student ID");
      return;
    }

    try {
      const response = await axios.get(`${GET_SCHEDULE_URL}/${studentId}`);

      if (response.status === 200) {
        setSchedule(response.data.data);
      } else {
        setMessage("Failed to retrieve schedule");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("User is not a student or has no schedule");
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
      <h2>Get Student Schedule</h2>
      <div>
        <label>
          Student ID:
          <input
            type="number"
            name="studentId"
            value={studentId || ''}
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
                <strong>Teacher Name:</strong> {item["name teacher"]}<br />
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

export default StudentSchedule;