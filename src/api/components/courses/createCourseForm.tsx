import React, { useState } from 'react';
import axios from 'axios';

const CREATE_COURSE_URL = 'http://18.222.67.121/api/courses';

const CreateCourseForm: React.FC = () => {
  const [courseData, setCourseData] = useState({
    name_course: '',
    teacher_id: '',
    description: '',
    image_url: '',
  });

  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(CREATE_COURSE_URL, courseData);
      if (response.status === 201) {
        setResponseMessage('Course created successfully');
        setCourseData({
          name_course: '',
          teacher_id: '',
          description: '',
          image_url: '',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setResponseMessage('Validation error: ' + JSON.stringify(error.response.data.errors));
          } else if (error.response.status === 404) {
            setResponseMessage('Teacher not found or not a teacher');
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
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="name_course"
            value={courseData.name_course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teacher ID:</label>
          <input
            type="number"
            name="teacher_id"
            value={courseData.teacher_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={courseData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateCourseForm;
