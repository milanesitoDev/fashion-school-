import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GET_COURSES_WITHOUT_TEACHER_URL = 'http://18.222.67.121/api/courses/not_teacher';

interface Course {
  id: number;
  name_course: string;
  teacher_id: number;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const CoursesWithoutTeacher: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(GET_COURSES_WITHOUT_TEACHER_URL);
        if (response.status === 200) {
          setCourses(response.data.data);
          setMessage('Courses retrieved successfully');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setMessage('No courses without teachers found');
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

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Retrieve Courses without Teacher</h2>
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

export default CoursesWithoutTeacher;
