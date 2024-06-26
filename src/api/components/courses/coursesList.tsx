import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GET_COURSES_URL = 'http://18.222.67.121/api/courses';

interface Course {
  id: number;
  name_course: string;
  teacher_id: number;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const CoursesList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(GET_COURSES_URL);
        if (response.status === 200) {
          setCourses(response.data.data);
          setResponseMessage('Courses retrieved successfully');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setResponseMessage('Courses not found');
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

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses List</h2>
      {responseMessage && <p>{responseMessage}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.name_course}</h3>
              <p>{course.description}</p>
              <img src={course.image_url} alt={course.name_course} style={{ width: '100px' }} />
              <p>Teacher ID: {course.teacher_id}</p>
              <p>Created at: {course.created_at}</p>
              <p>Updated at: {course.updated_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CoursesList;
