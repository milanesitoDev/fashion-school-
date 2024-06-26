import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GET_PAYMENTS_URL = 'http://18.222.67.121/api/payment';

interface Payment {
  id: number;
  product_id: number;
  user_id: number;
  value: string;
  currency: string;
  observations: string;
  created_at: string;
  updated_at: string;
}

const GetAllPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(GET_PAYMENTS_URL);
        if (response.status === 200) {
          setPayments(response.data.data);
          setMessage('Payments retrieved successfully');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setMessage('Payment not found');
            } else if (error.response.status === 500) {
              setMessage('Server error: ' + error.response.data.error);
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

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>All Payments</h2>
      {message && <p>{message}</p>}
      {payments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>User ID</th>
              <th>Value</th>
              <th>Currency</th>
              <th>Observations</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.product_id}</td>
                <td>{payment.user_id}</td>
                <td>{payment.value}</td>
                <td>{payment.currency}</td>
                <td>{payment.observations}</td>
                <td>{new Date(payment.created_at).toLocaleString()}</td>
                <td>{new Date(payment.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payments found</p>
      )}
    </div>
  );
};

export default GetAllPayments;