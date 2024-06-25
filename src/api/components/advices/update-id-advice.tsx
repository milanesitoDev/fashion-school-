import React, { useState } from "react";
import axios from "axios";

const UPDATE_ADVICE_URL = 'http://18.222.67.121/api/advices';

const UpdateAdvice: React.FC = () => {
  const [adviceId, setAdviceId] = useState<number | null>(null);
  const [adviceText, setAdviceText] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdviceId(Number(e.target.value));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdviceText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (adviceId === null || adviceText.trim() === "") {
      setMessage("Please enter a valid advice ID and text");
      return;
    }

    try {
      const response = await axios.patch(`${UPDATE_ADVICE_URL}/${adviceId}`, {
        text: adviceText
      });

      if (response.status === 200) {
        setMessage("Advice updated successfully");
      } else {
        setMessage("Failed to update advice");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Bad request");
          } else if (error.response.status === 404) {
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
      <h2>Update Advice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Advice ID:
            <input
              type="number"
              name="adviceId"
              value={adviceId || ''}
              onChange={handleIdChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Advice Text:
            <input
              type="text"
              name="adviceText"
              value={adviceText}
              onChange={handleTextChange}
              required
            />
          </label>
        </div>
        <button type="submit">Update Advice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateAdvice;
