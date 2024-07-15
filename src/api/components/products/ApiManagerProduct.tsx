import React, { useState } from "react";
import CreateProduct from "./createProduct";
import DeleteProductById from "./deleteProductById";
import GetAllProduct from "./getAllProduct";
import GetProductById from "./getProductById";
import UpdateProductById from "./updateProductById";


const ApiManagerProduct: React.FC= () => {
  const [selectedApi, setSelectedApi] = useState<string>("");

  const renderApiComponent = () => {
    switch (selectedApi) {
      case "CreateProduct":
        return <CreateProduct />;
      case "DeleteProductById":
        return <DeleteProductById />;
      case "GetAllProduct":
        return <GetAllProduct />;
      case "GetProductById":
        return <GetProductById />;
      case "UpdateProductById":
        return <UpdateProductById />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerProduct">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Product</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
          <button onClick={() => setSelectedApi("CreateProduct")} className="text-center text-lg font-medium">Create Product</button>
          <button onClick={() => setSelectedApi("DeleteProductById")} className="text-center text-lg font-medium">Delete Product</button>
          <button onClick={() => setSelectedApi("GetAllProduct")} className="text-center text-lg font-medium">Get All Products</button>
          <button onClick={() => setSelectedApi("GetProductById")} className="text-center text-lg font-medium">Get Product</button>
          <button onClick={() => setSelectedApi("UpdateProductById")} className="text-center text-lg font-medium">Update Product</button>
        </div>
        <div>
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerProduct;