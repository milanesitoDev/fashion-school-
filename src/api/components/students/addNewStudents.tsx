import React, { useState } from "react";
import axios from "axios";

const ADD_STUDENT_URL = 'http://18.222.67.121/api/students';

interface AddStudent {
  user_id: number;
  course_id: number;
}

const AddNewStudents: React.FC = () => {
  const [student, setStudent] = useState<AddStudent>({
    user_id: 0,
    course_id: 1,
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(ADD_STUDENT_URL, student);

      if (response.status === 201) {
        setMessage("Student added successfully");
      } else {
        setMessage("Failed to add student");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Validation error: " + JSON.stringify(error.response.data.errors));
          } else if (error.response.status === 404) {
            setMessage("Student not found");
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
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User ID:
            <input
              type="number"
              name="user_id"
              value={student.user_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Course ID:
            <input
              type="number"
              name="course_id"
              value={student.course_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddNewStudents;
