import React, { useState } from "react";
import AddCalification from "./addCalification";
import DeleteCalificationById from "./deleteCalificationById";
import GetCalificationById from "./getCalificationById";
import GetCalifications from "./getCalifications";
import GetCourseCalifications from "./getCourseCalifications";
import UpdateCalificationById from "./updateCalificationById";



const ApiManagerCalification: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>("");

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "AddCalification":
        return <AddCalification />;
      case "DeleteCalificationById":
        return <DeleteCalificationById />;
      case "GetCalificationById":
        return <GetCalificationById />;
      case "GetCalifications":
        return <GetCalifications />;
      case "GetCourseCalifications":
        return <GetCourseCalifications />;
      case "UpdateCalificationById":
        return <UpdateCalificationById />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerCalification">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Calification</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <button onClick={() => setSelectedApi("AddCalification")} className="text-center text-lg font-medium">Add Calification</button>
          <button onClick={() => setSelectedApi("DeleteCalificationById")} className="text-center text-lg font-medium">Delete Calification</button>
          <button onClick={() => setSelectedApi("GetCalificationById")} className="text-center text-lg font-medium">Get Calification By ID</button>
          <button onClick={() => setSelectedApi("GetCalifications")} className="text-center text-lg font-medium">Get Califications</button>
          <button onClick={() => setSelectedApi("GetCourseCalifications")} className="text-center text-lg font-medium">Get Course Califications</button>
          <button onClick={() => setSelectedApi("UpdateCalificationById")} className="text-center text-lg font-medium">Update Calification</button>
        </div>
        <div>
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerCalification;