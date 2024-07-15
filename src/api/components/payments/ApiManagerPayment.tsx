import React, { useState } from "react";
import RegisterPayment from "./registerPayment";
import DeletePaymentById from "./deletePaymentById";
import GetAllPayments from "./getAllPayments";
import GetPaymentById from "./getPaymentById";
import UpdatePaymentById from "./updatePaymentById";

const ApiManagerPayment: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>("");
  const [paymentId, setPaymentId] = useState<number>(0);

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "RegisterPayment":
        return <RegisterPayment />;
      case "DeletePaymentById":
        return <DeletePaymentById paymentId={paymentId} />;
      case "GetAllPayments":
        return <GetAllPayments />;
      case "GetPaymentById":
        return <GetPaymentById paymentId={paymentId} />;
      case "UpdatePaymentById":
        return <UpdatePaymentById paymentId={paymentId} />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  const handlePaymentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentId(Number(event.target.value));
  };

  return (
    <section className="ManagerPayment">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Payment</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
          <button onClick={() => setSelectedApi("RegisterPayment")} className="text-center text-lg font-medium">Register Payment</button>
          <button onClick={() => setSelectedApi("DeletePaymentById")} className="text-center text-lg font-medium">Delete Payment</button>
          <button onClick={() => setSelectedApi("GetAllPayments")} className="text-center text-lg font-medium">Get All Payments</button>
          <button onClick={() => setSelectedApi("GetPaymentById")} className="text-center text-lg font-medium">Get Payment</button>
          <button onClick={() => setSelectedApi("UpdatePaymentById")} className="text-center text-lg font-medium">Update Payment</button>
        </div>
        <div className="mt-4">
          {(selectedApi === "DeletePaymentById" || selectedApi === "GetPaymentById" || selectedApi === "UpdatePaymentById") && (
            <div className="mb-4">
              <label className="block text-sm font-medium">Payment ID:</label>
              <input type="number" value={paymentId} onChange={handlePaymentIdChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          )}
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerPayment;