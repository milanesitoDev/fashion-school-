import React, { useState } from 'react';
import axios from 'axios';

const GET_COURSE_URL = 'http://18.222.67.121/api/courses';

const GetCourseForm: React.FC = () => {
  const [courseId, setCourseId] = useState<string>('');
  const [courseData, setCourseData] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${GET_COURSE_URL}/${courseId}`);
      if (response.status === 200) {
        setCourseData(response.data.data);
        setResponseMessage('Course retrieved successfully');
      }
    } catch (error) {
      setCourseData(null);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage('Course not found');
          } else {
            setResponseMessage('An error occurred: ' + error.message);
          }
        } else {
          setResponseMessage('An error occurred: ' + error.message);
        }
      } else {
        setResponseMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Get a Course by ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <input
            type="text"
            name="courseId"
            value={courseId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Get Course</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {courseData && (
        <div>
          <h3>Course Details</h3>
          <p>ID: {courseData.id}</p>
          <p>Name: {courseData.name_course}</p>
          <p>Teacher ID: {courseData.teacher_id}</p>
          <p>Description: {courseData.description}</p>
          <p>Created At: {courseData.created_at}</p>
          <p>Updated At: {courseData.updated_at}</p>
        </div>
      )}
    </div>
  );
};

export default GetCourseForm;
