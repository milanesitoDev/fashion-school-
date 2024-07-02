import React, { useState } from 'react';
import axios from 'axios';

const GET_PRODUCT_URL = 'http://18.222.67.121/api/products';

const GetAllProduct: React.FC = () => {
  const [productId, setProductId] = useState<number | string>('');
  const [product, setProduct] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleGetProduct = async () => {
    if (!productId) {
      setMessage('Please enter a product ID.');
      return;
    }

    try {
      const response = await axios.get(`${GET_PRODUCT_URL}/${productId}`);

      if (response.status === 200) {
        setProduct(response.data.data);
        setMessage('Product found');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage('Product not found');
          } else {
            setMessage('An error occurred: ' + error.message);
          }
        } else {
          setMessage('An error occurred: ' + error.message);
        }
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Get Product by ID</h2>
      <input
        type="number"
        value={productId}
        onChange={handleInputChange}
        placeholder="Enter product ID"
      />
      <button onClick={handleGetProduct}>Get Product</button>
      {message && <p>{message}</p>}
      {product && (
        <div>
          <h3>Product Details</h3>
          <p>ID: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Currency: {product.currency}</p>
          <p>Created At: {product.created_at}</p>
          <p>Updated At: {product.updated_at}</p>
        </div>
      )}
    </div>
  );
};

export default GetAllProduct;
