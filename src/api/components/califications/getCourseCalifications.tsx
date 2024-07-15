import React, { useState } from 'react';
import axios from 'axios';

const GET_COURSE_CALIFICATIONS_URL = 'http://18.222.67.121/api/califications/courses';

interface CourseCalificationData {
  course: string;
  teacher: string;
  califications: Record<string, number[]>;
}

const GetCourseCalifications: React.FC = () => {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [data, setData] = useState<CourseCalificationData | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleCourseIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(Number(e.target.value));
  };

  const handleGetCourseCalifications = async () => {
    setMessage("");
    setData(null);

    if (studentId === null || courseId === null) {
      setMessage("Please enter valid student and course IDs");
      return;
    }

    try {
      const response = await axios.get(`${GET_COURSE_CALIFICATIONS_URL}/${studentId}/course/${courseId}`);

      if (response.status === 200) {
        setData(response.data.data);
        setMessage("Course califications retrieved successfully");
      } else {
        setMessage("Failed to retrieve course califications");
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
      <h2>Get Course Califications by Student ID and Course ID</h2>
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
      <button onClick={handleGetCourseCalifications}>Get Course Califications</button>
      {message && <p>{message}</p>}
      {data && (
        <div>
          <h3>Course Info</h3>
          <p>Course Name: {data.course}</p>
          <p>Teacher Name: {data.teacher}</p>
          <h3>Califications</h3>
          <ul>
            {Object.entries(data.califications).map(([activityName, califications]) => (
              <li key={activityName}>
                <p>Activity Name: {activityName}</p>
                <p>Califications: {califications.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetCourseCalifications;