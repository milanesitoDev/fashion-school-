import React, { useState } from "react";
import axios from "axios";

const DeleteStudent: React.FC = () => {
  const [studentId, setStudentId] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.delete(`http://18.222.67.121/api/student/${studentId}`);

      if (response.status === 200) {
        setMessage("Student deleted successfully");
      } else {
        setMessage("Failed to delete student");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
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
      <h2>Delete Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Student ID:
            <input type="number" name="student_id" value={studentId} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Delete Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteStudent;
