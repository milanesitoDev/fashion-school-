import React, { useState } from 'react';
import axios from 'axios';

const GET_PRODUCT_URL = 'http://18.222.67.121/api/products';

const GetProductById: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<any | null>(null);
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
        setMessage('');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage('Error: ' + error.response.data.message);
          setProduct(null);
        } else {
          setMessage('Error: ' + error.message);
          setProduct(null);
        }
      } else {
        setMessage('An unexpected error occurred');
        setProduct(null);
      }
    }
  };

  return (
    <div>
      <h2>Get Product by ID</h2>
      <input
        type="text"
        value={productId}
        onChange={handleInputChange}
        placeholder="Enter Product ID"
      />
      <button onClick={handleGetProduct}>Get Product</button>
      {message && <p>{message}</p>}
      {product && (
        <div>
          <h3>Product Details</h3>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Currency:</strong> {product.currency}</p>
          <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(product.updated_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default GetProductById;
