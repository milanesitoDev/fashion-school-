import React, { useState } from "react";
import axios from "axios";

interface Student {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const GetStudentsByCourse: React.FC = () => {
  const [courseId, setCourseId] = useState<number>(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.get(`http://18.222.67.121/api/students/courses/${courseId}`);

      if (response.status === 200) {
        setStudents(response.data.data);
        setMessage("Students retrieved successfully");
      } else {
        setMessage("Failed to retrieve students");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Student not found");
            setStudents([]);
          } else {
            setMessage("An error occurred: " + error.message);
            setStudents([]);
          }
        } else {
          setMessage("An error occurred: " + error.message);
          setStudents([]);
        }
      } else {
        setMessage("An unexpected error occurred");
        setStudents([]);
      }
    }
  };

  return (
    <div>
      <h2>Get Students by Course ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Course ID:
            <input
              type="number"
              name="course_id"
              value={courseId}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Get Students</button>
      </form>
      {message && <p>{message}</p>}
      {students.length > 0 && (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.user.name} ({student.user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetStudentsByCourse;
