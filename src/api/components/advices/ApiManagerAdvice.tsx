import React, { useState } from "react";
import CreateAdvice from "./createAdvice";
import ChangeAdviceImage from "./changeAdviceImage";
import DeleteAdvice from "./deleteAdvice";
import UpdateAdvice from "./updateAdvice";
import AdviceList from "./adviceList";

interface ApiProps {
  adviceId?: number;
}

const ApiManagerAdvice: React.FC<ApiProps> = ({ adviceId }) => {
  const [selectedApi, setSelectedApi] = useState<string>("");

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "CreateAdvice":
        return <CreateAdvice />;
      case "ChangeAdviceImage":
        return <ChangeAdviceImage />;
      case "DeleteAdvice":
        return <DeleteAdvice />;
      case "UpdateAdvice":
        return <UpdateAdvice />;
      case "AdviceList":
        return <AdviceList />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerAdvice">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Advice</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
          <button onClick={() => setSelectedApi("CreateAdvice")} className="text-center text-lg font-medium">Create Advice</button>
          <button onClick={() => setSelectedApi("ChangeAdviceImage")} className="text-center text-lg font-medium">Change Advice Image</button>
          <button onClick={() => setSelectedApi("DeleteAdvice")} className="text-center text-lg font-medium">Delete Advice</button>
          <button onClick={() => setSelectedApi("UpdateAdvice")} className="text-center text-lg font-medium">Update Advice</button>
          <button onClick={() => setSelectedApi("AdviceList")} className="text-center text-lg font-medium">Advice List</button>
        </div>
        <div>
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerAdvice;