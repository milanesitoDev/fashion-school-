import React, { useState } from 'react';
import axios from 'axios';

const DELETE_PAYMENT_URL = 'http://18.222.67.121/api/payment';

interface DeletePaymentProps {
  paymentId: number;
}

const DeletePaymentById: React.FC<DeletePaymentProps> = ({ paymentId }) => {
  const [message, setMessage] = useState<string>('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${DELETE_PAYMENT_URL}/${paymentId}`);

      if (response.status === 200) {
        setMessage('Payment deleted successfully');
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

  return (
    <div>
      <h2>Delete Payment</h2>
      <button onClick={handleDelete}>Delete Payment</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeletePaymentById;
