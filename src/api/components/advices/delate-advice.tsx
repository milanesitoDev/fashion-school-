import React, { useState } from "react";
import axios from "axios";

const DELETE_ADVICE_URL = 'http://18.222.67.121/api/advices';

const DeleteAdvice: React.FC = () => {
  const [adviceId, setAdviceId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdviceId(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (adviceId === null) {
      setMessage("Please enter a valid advice ID");
      return;
    }

    try {
      const response = await axios.delete(`${DELETE_ADVICE_URL}/${adviceId}`);

      if (response.status === 200) {
        setMessage("Advice deleted successfully");
      } else {
        setMessage("Failed to delete advice");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Advice not found");
          } else if (error.response.status === 500) {
            setMessage("Internal server error");
          } else {
            setMessage("An error occurred: " + error.message);
          }
        } else {
          setMessage("An error occurred: " + error.message);
        }
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Delete Advice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Advice ID:
            <input
              type="number"
              name="adviceId"
              value={adviceId || ''}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Delete Advice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAdvice;
