import React, { useState } from 'react';
import axios from 'axios';

const UPDATE_PAYMENT_URL = 'http://18.222.67.121/api/payment';

interface PaymentUpdateProps {
  paymentId: number;
}

const UpdatePaymentById: React.FC<PaymentUpdateProps> = ({ paymentId }) => {
  const [value, setValue] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [observations, setObservations] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${UPDATE_PAYMENT_URL}/${paymentId}`, {
        value,
        currency,
        observations,
      });

      if (response.status === 200) {
        setMessage('Payment updated successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage('Validation error');
          } else if (error.response.status === 404) {
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
      <h2>Update Payment</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <div>
          <label>Value:</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} required />
        </div>
        <div>
          <label>Currency:</label>
          <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
        </div>
        <div>
          <label>Observations:</label>
          <textarea value={observations} onChange={(e) => setObservations(e.target.value)} required />
        </div>
        <button type="submit">Update Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePaymentById;