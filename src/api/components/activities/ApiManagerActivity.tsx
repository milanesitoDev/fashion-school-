import React, { useState } from "react";
import CreateActivity from "./createActivities";
import DeleteActivity from "./deleteActivity";
import GetActivity from "./getActivity";
import UpdateActivity from "./updateActivity";
import RecoverActivities from "./recoverActivities";
import CourseActivities from "./courseActivities";

interface ApiProps {
  activityId?: number;
  courseId?: number;
}

const ApiManagerActivity: React.FC<ApiProps> = ({ activityId, courseId }) => {
  const [selectedApi, setSelectedApi] = useState<string>("");

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "CreateActivity":
        return <CreateActivity />;
      case "DeleteActivity":
        return activityId ? <DeleteActivity activityId={activityId} /> : <p>Please provide an Activity ID.</p>;
      case "GetActivity":
        return activityId ? <GetActivity activityId={activityId} /> : <p>Please provide an Activity ID.</p>;
      case "UpdateActivity":
        return activityId ? <UpdateActivity activityId={activityId} /> : <p>Please provide an Activity ID.</p>;
      case "RecoverActivities":
        return <RecoverActivities />;
      case "CourseActivities":
        return courseId ? <CourseActivities courseId={courseId} /> : <p>Please provide a Course ID.</p>;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerActivity">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Activity</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
          <button onClick={() => setSelectedApi("CreateActivity")} className="text-center text-lg font-medium">Create Activity</button>
          <button onClick={() => setSelectedApi("DeleteActivity")} className="text-center text-lg font-medium">Delete Activity</button>
          <button onClick={() => setSelectedApi("GetActivity")} className="text-center text-lg font-medium">Get Activity</button>
          <button onClick={() => setSelectedApi("UpdateActivity")} className="text-center text-lg font-medium">Update Activity</button>
          <button onClick={() => setSelectedApi("RecoverActivities")} className="text-center text-lg font-medium">Recover Activities</button>
          <button onClick={() => setSelectedApi("CourseActivities")} className="text-center text-lg font-medium">Course Activities</button>
        </div>
        <div>
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerActivity;