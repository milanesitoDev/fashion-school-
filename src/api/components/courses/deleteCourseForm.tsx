import React, { useState } from 'react';
import axios from 'axios';

const DELETE_COURSE_URL = 'http://18.222.67.121/api/courses';

const DeleteCourseForm: React.FC = () => {
  const [courseId, setCourseId] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${DELETE_COURSE_URL}/${courseId}`);
      if (response.status === 200) {
        setResponseMessage('Course deleted successfully');
        setCourseId('');
      }
    } catch (error) {
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
      <h2>Delete a Course</h2>
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
        <button type="submit">Delete Course</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DeleteCourseForm;
