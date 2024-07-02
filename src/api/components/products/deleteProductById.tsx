import React, { useState } from 'react';
import axios from 'axios';

const DELETE_PRODUCT_URL = 'http://18.222.67.121/api/products';

const DeleteProductById: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleDeleteProduct = async () => {
    if (!productId) {
      setMessage('Please enter a product ID.');
      return;
    }

    try {
      const response = await axios.delete(`${DELETE_PRODUCT_URL}/${productId}`);

      if (response.status === 200) {
        setMessage('Product deleted successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage('Error: ' + error.response.data.message);
        } else {
          setMessage('Error: ' + error.message);
        }
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Delete Product by ID</h2>
      <input
        type="text"
        value={productId}
        onChange={handleIdChange}
        placeholder="Enter Product ID"
      />
      <button onClick={handleDeleteProduct}>Delete Product</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteProductById;