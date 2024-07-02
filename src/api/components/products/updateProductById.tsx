import React, { useState } from 'react';
import axios from 'axios';

const UPDATE_PRODUCT_URL = 'http://18.222.67.121/api/products';

const UpdateProductById: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: 0,
    currency: ''
  });
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleUpdateProduct = async () => {
    if (!productId) {
      setMessage('Please enter a product ID.');
      return;
    }

    try {
      const response = await axios.post(`${UPDATE_PRODUCT_URL}/${productId}`, productDetails);

      if (response.status === 200) {
        setMessage('Product updated successfully');
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
      <h2>Update Product by ID</h2>
      <input
        type="text"
        value={productId}
        onChange={handleIdChange}
        placeholder="Enter Product ID"
      />
      <div>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handleInputChange}
          placeholder="Enter Product Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={handleInputChange}
          placeholder="Enter Product Description"
        />
      </div>
      <div>
        <input
          type="number"
          name="price"
          value={productDetails.price}
          onChange={handleInputChange}
          placeholder="Enter Product Price"
        />
      </div>
      <div>
        <input
          type="text"
          name="currency"
          value={productDetails.currency}
          onChange={handleInputChange}
          placeholder="Enter Product Currency"
        />
      </div>
      <button onClick={handleUpdateProduct}>Update Product</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProductById;
