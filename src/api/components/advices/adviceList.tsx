import React, { useState, useEffect } from "react";
import axios from "axios";

const GET_ADVICES_URL = 'http://18.222.67.121/api/advices';

interface Advice {
  id: number;
  text: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const AdviceList: React.FC = () => {
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchAdvices = async () => {
      try {
        const response = await axios.get(GET_ADVICES_URL);

        if (response.status === 200) {
          setAdvices(response.data.data);
        } else {
          setMessage("Failed to retrieve advices");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setMessage("Advices not found");
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

    fetchAdvices();
  }, []);

  return (
    <div>
      <h2>Advices</h2>
      {message && <p>{message}</p>}
      <ul>
        {advices.map((advice) => (
          <li key={advice.id}>
            <p>{advice.text}</p>
            {advice.image_url && <img src={advice.image_url} alt="Advice" />}
            <p><small>Created at: {new Date(advice.created_at).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdviceList;
