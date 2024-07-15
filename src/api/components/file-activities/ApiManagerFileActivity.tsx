import React, { useState } from "react";
import AddFileToActivity from "./addFileToActivity";
import DeleteFileActivity from "./deleteFileActivity";
import GetFileById from "./getFileById";
import GetFilesForActivity from "./getFilesForActivity";
import GetFilesForActivityAndStudent from "./getFilesForActivityAndStudent";
import UpdateFileActivity from "./updateFileActivity";

interface ApiProps {
  activityId: number;
  studentId?: number;  // Optional, for cases where studentId is required
}

const ApiManagerFileActivity: React.FC<ApiProps> = ({ }) => {
  const [selectedApi, setSelectedApi] = useState<string>("");

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "AddFileToActivity":
        return <AddFileToActivity />;
      case "DeleteFileActivity":
        return <DeleteFileActivity />;
      case "GetFileById":
        return <GetFileById />;
      case "GetFilesForActivity":
        return <GetFilesForActivity />;
      case "GetFilesForActivityAndStudent":
        return <GetFilesForActivityAndStudent />;
      case "UpdateFileActivity":
        return <UpdateFileActivity />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerFileActivity">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager File Activity</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <button onClick={() => setSelectedApi("AddFileToActivity")} className="text-center text-lg font-medium">Add File to Activity</button>
          <button onClick={() => setSelectedApi("DeleteFileActivity")} className="text-center text-lg font-medium">Delete File Activity</button>
          <button onClick={() => setSelectedApi("GetFileById")} className="text-center text-lg font-medium">Get File by ID</button>
          <button onClick={() => setSelectedApi("GetFilesForActivity")} className="text-center text-lg font-medium">Get Files for Activity</button>
          <button onClick={() => setSelectedApi("GetFilesForActivityAndStudent")} className="text-center text-lg font-medium">Get Files for Activity and Student</button>
          <button onClick={() => setSelectedApi("UpdateFileActivity")} className="text-center text-lg font-medium">Update File Activity</button>
        </div>
        <div>
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerFileActivity;
