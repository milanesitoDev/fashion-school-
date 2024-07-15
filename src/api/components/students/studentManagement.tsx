import React, { useState } from "react";
import AddNewStudents from "./addNewStudents";
import DeleteStudent from "./deleteStudent";
import GetStudentsByCourse from "./getStudentsByCourse";
import RetrieveIdStudent from "./retrieveIdStudent";
import RetrieveStudents from "./retrieveStudents";

const  ApiManagerStudent: React.FC = () => {
  const [view, setView] = useState<string>("");

  const renderView = () => {
    switch (view) {
      case "add":
        return <AddNewStudents />;
      case "delete":
        return <DeleteStudent />;
      case "getByCourse":
        return <GetStudentsByCourse />;
      case "getById":
        return <RetrieveIdStudent studentId={1} />;
      case "retrieveAll":
        return <RetrieveStudents />;
      default:
        return <p>Please select an option</p>;
    }
  };

  return (
    <div  className="mx-auto max-w-lg text-center">
      <h2 className="text-2xl font-bold sm:text-3xl">Student Management</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <button onClick={() => setView("add")}  className="text-center text-lg font-medium">Add New Student</button>
        <button onClick={() => setView("delete")}  className="text-center text-lg font-medium">Delete Student</button>
        <button onClick={() => setView("getByCourse")}  className="text-center text-lg font-medium">Get Students By Course</button>
        <button onClick={() => setView("getById")}  className="text-center text-lg font-medium">Get Student By ID</button>
        <button onClick={() => setView("retrieveAll")}  className="text-center text-lg font-medium">Retrieve All Students</button>
      </div>
      {renderView()}
    </div>
  );
};

export default ApiManagerStudent;
