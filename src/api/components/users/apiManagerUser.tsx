import React, { useState } from "react";
import ChangeUserPassword from "./changeUserPassword";
import DeleteUser from "./delateUser";
import GetAllUsers from "./getAllUsers";
import GetUser from "./getUser";
import UpdateUser from "./updateUser";

interface ApiProps {
  userId: number;
}

const ApiManagerUser: React.FC<ApiProps> = ({ userId }) => {
  const [selectedApi, setSelectedApi] = useState<string>("");

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "ChangeUserPassword":
        return <ChangeUserPassword userId={userId} />;
      case "DeleteUser":
        return <DeleteUser userId={userId} />;
      case "GetAllUsers":
        return <GetAllUsers />;
      case "GetUser":
        return <GetUser userId={userId} />;
      case "UpdateUser":
        return <UpdateUser userId={userId} />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerUser">
      <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">API Manager User</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <button onClick={() => setSelectedApi("ChangeUserPassword")} className="text-center text-lg font-medium">Change User Password</button>
        <button onClick={() => setSelectedApi("DeleteUser")} className="text-center text-lg font-medium">Delete User</button>
        <button onClick={() => setSelectedApi("GetAllUsers")} className="text-center text-lg font-medium">Get All Users</button>
        <button onClick={() => setSelectedApi("GetUser")} className="text-center text-lg font-medium">Get User</button>
        <button onClick={() => setSelectedApi("UpdateUser")} className="text-center text-lg font-medium">Update User</button>
      </div>
      <div>
        {renderApiComponent()}
      </div>
    </div>
    </section>
  );
};

export default ApiManagerUser;
