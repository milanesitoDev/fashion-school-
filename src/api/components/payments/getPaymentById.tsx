import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GET_PAYMENT_URL = 'http://18.222.67.121/api/payment';

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

interface PaymentProps {
  paymentId: number;
}

const GetPaymentById: React.FC<PaymentProps> = ({ paymentId }) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${GET_PAYMENT_URL}/${paymentId}`);
        if (response.status === 200) {
          setPayment(response.data.data);
          setMessage('Payment retrieved successfully');
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

    fetchPayment();
  }, [paymentId]);

  return (
    <div>
      <h2>Payment Details</h2>
      {message && <p>{message}</p>}
      {payment ? (
        <div>
          <p><strong>ID:</strong> {payment.id}</p>
          <p><strong>Product ID:</strong> {payment.product_id}</p>
          <p><strong>User ID:</strong> {payment.user_id}</p>
          <p><strong>Value:</strong> {payment.value}</p>
          <p><strong>Currency:</strong> {payment.currency}</p>
          <p><strong>Observations:</strong> {payment.observations}</p>
          <p><strong>Created At:</strong> {new Date(payment.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(payment.updated_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>No payment details available</p>
      )}
    </div>
  );
};

export default GetPaymentById;