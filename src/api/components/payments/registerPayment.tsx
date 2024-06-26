import React, { useState } from 'react';
import axios from 'axios';

const REGISTER_PAYMENT_URL = 'http://18.222.67.121/api/payments';

interface PaymentResponse {
  message: string;
  status: number;
  data: {
    id: number;
    product_id: number;
    user_id: number;
    value: string;
    currency: string;
    observations: string;
    created_at: string;
    updated_at: string;
  };
}

const RegisterPayment: React.FC = () => {
  const [paymentData, setPaymentData] = useState({
    product_id: '',
    user_id: '',
    value: '',
    currency: 'mxn',
    observations: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<PaymentResponse>(REGISTER_PAYMENT_URL, paymentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setMessage('Payment created successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage('Validation error: ' + error.response.data.message);
          } else if (error.response.status === 500) {
            setMessage('Error creating payment: ' + error.response.data.error);
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
      <h2>Register Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product ID:
            <input
              type="number"
              name="product_id"
              value={paymentData.product_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            User ID:
            <input
              type="number"
              name="user_id"
              value={paymentData.user_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Value:
            <input
              type="text"
              name="value"
              value={paymentData.value}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Currency:
            <input
              type="text"
              name="currency"
              value={paymentData.currency}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Observations:
            <textarea
              name="observations"
              value={paymentData.observations}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Register Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPayment;