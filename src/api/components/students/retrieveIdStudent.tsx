import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  name: string;
}

interface Student {
  id: number;
  user: User;
  course: Course | null;
}

interface RetrieveStudentProps {
  studentId: number;
}

const RetrieveIdStudent: React.FC<RetrieveStudentProps> = ({ studentId }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://18.222.67.121/api/student/${studentId}`);

        console.log("API Response:", response.data);

        if (response.status === 200) {
          setStudent(response.data.data);
          setMessage("Student retrieved successfully");
        } else {
          setMessage("Failed to retrieve student");
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

    fetchStudent();
  }, [studentId]);

  return (
    <div>
      <h2>Student Details</h2>
      {message && <p>{message}</p>}
      {student ? (
        <div>
          <p>ID: {student.id}</p>
          <p>Name: {student.user.name}</p>
          <p>Email: {student.user.email}</p>
          <p>Course: {student.course ? student.course.name : "N/A"}</p>
        </div>
      ) : (
        <p>No student found</p>
      )}
    </div>
  );
};

export default RetrieveIdStudent;