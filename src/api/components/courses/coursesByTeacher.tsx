import React, { useState } from 'react';
import axios from 'axios';

const GET_COURSES_BY_TEACHER_URL = 'http://18.222.67.121/api/courses/teacher';

interface Course {
  id: number;
  name_course: string;
  teacher_id: number;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const CoursesByTeacher: React.FC = () => {
  const [teacherId, setTeacherId] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${GET_COURSES_BY_TEACHER_URL}/${teacherId}`);
      if (response.status === 200) {
        setCourses(response.data.data);
        setMessage('Courses retrieved successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage('Teacher not found or no courses found for the teacher');
          } else {
            setMessage('An error occurred: ' + error.message);
          }
        } else {
          setMessage('An error occurred: ' + error.message);
        }
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Retrieve Courses by Teacher ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Teacher ID:</label>
          <input
            type="text"
            name="teacherId"
            value={teacherId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Retrieve Courses</button>
      </form>
      <div>
        <h3>{message}</h3>
        {courses.length > 0 && (
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <strong>{course.name_course}</strong> - {course.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CoursesByTeacher;
