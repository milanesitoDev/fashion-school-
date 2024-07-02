import React, { useState } from 'react';
import axios from 'axios';

const CREATE_PRODUCT_URL = 'http://18.222.67.121/api/products';

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    if (!product.name || !product.description || !product.price) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(CREATE_PRODUCT_URL, product);

      if (response.status === 201) {
        setMessage('Product created successfully');
        setProduct({ name: '', description: '', price: '', });
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
      <h2>Create New Product</h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleInputChange}
        placeholder="Product Description"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        placeholder="Product Price"
      />
      <select name="currency" value={''} onChange={handleInputChange}>
        <option value="USD">USD</option>
        <option value="MXN">MXN</option>
        {/* Add more currencies as needed */}
      </select>
      <button onClick={handleCreateProduct}>Create Product</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProduct;
