import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UPDATE_COURSE_URL = 'http://18.222.67.121/api/courses';

interface Course {
  id: number;
  name_course: string;
  teacher_id: number;
  description: string;
  created_at: string;
  updated_at: string;
}

const UpdateCourseForm: React.FC = () => {
  const [courseId, setCourseId] = useState<string>('');
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name_course: '',
    teacher_id: '',
    description: ''
  });
  const [responseMessage, setResponseMessage] = useState<string>('');

  useEffect(() => {
    if (courseData) {
      setFormData({
        name_course: courseData.name_course,
        teacher_id: courseData.teacher_id.toString(),
        description: courseData.description
      });
    }
  }, [courseData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${UPDATE_COURSE_URL}/${courseId}`, formData);
      if (response.status === 200) {
        setCourseData(null);
        setResponseMessage('Course updated successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage('Course not found');
          } else if (error.response.status === 400) {
            setResponseMessage('Bad request: ' + error.response.data.message);
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
      <h2>Update Course by ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <input
            type="text"
            name="courseId"
            value={courseId}
            onChange={handleIdChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name_course"
            value={formData.name_course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teacher ID:</label>
          <input
            type="text"
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Course</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateCourseForm;
