import React, { useState } from 'react';
import axios from 'axios';

const GET_CALIFICATIONS_URL = 'http://18.222.67.121/califications';

// Definir el tipo de datos esperados
interface CalificationData {
  "info activity": {
    course: string;
    teacher: string;
  };
  califications: {
    [key: string]: number[];
  };
}

const GetCourseCalifications: React.FC = () => {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [data, setData] = useState<CalificationData | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleCourseIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(Number(e.target.value));
  };

  const handleGetCalifications = async () => {
    setMessage("");
    setData(null);

    if (studentId === null || courseId === null) {
      setMessage("Please enter valid student and course IDs");
      return;
    }

    try {
      const response = await axios.get(`${GET_CALIFICATIONS_URL}/${studentId}/course/${courseId}`);

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
            setMessage("No califications found for this course and student");
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
      <h2>Get Course Califications</h2>
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
          Course ID:
          <input
            type="number"
            name="courseId"
            value={courseId || ''}
            onChange={handleCourseIdChange}
            required
          />
        </label>
      </div>
      <button onClick={handleGetCalifications}>Get Califications</button>
      {message && <p>{message}</p>}
      {data && (
        <div>
          <h3>Course Info</h3>
          <p>Course: {data["info activity"].course}</p>
          <p>Teacher: {data["info activity"].teacher}</p>
          <h3>Califications</h3>
          <ul>
            {Object.entries(data.califications).map(([activity, grades]) => (
              <li key={activity}>
                {activity}:
                <ul>
                  {grades.map((grade, index) => (
                    <li key={index}>{grade}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetCourseCalifications;
