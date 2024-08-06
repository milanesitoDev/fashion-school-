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
  course: Course | null; // Permite que el curso sea nulo
}

const RetrieveStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://18.222.67.121/api/students');
        
        console.log("API Response:", response.data); // Imprime la respuesta en la consola

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
              setMessage("Students not found");
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

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students List</h2>
      {message && <p>{message}</p>}
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.user.name} ({student.user.email}) - Course: {student.course ? student.course.name : "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default RetrieveStudents;
