import React, { useState } from "react";
import axios from "axios";

const CREATE_ADVICE_URL = 'http://18.222.67.121/api/advices';

interface Advice {
  text: string;
  image?: File;
}

const CreateAdvice: React.FC = () => {
  const [advice, setAdvice] = useState<Advice>({ text: "" });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setAdvice((prevAdvice) => ({
        ...prevAdvice,
        image: files[0],
      }));
    } else {
      setAdvice((prevAdvice) => ({
        ...prevAdvice,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("text", advice.text);
    if (advice.image) {
      formData.append("image", advice.image);
    }

    try {
      const response = await axios.post(CREATE_ADVICE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setMessage("Advice created successfully");
      } else {
        setMessage("Failed to create advice");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Bad request: " + JSON.stringify(error.response.data.errors));
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
      <h2>Create New Advice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Text:
            <textarea
              name="text"
              value={advice.text}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Create Advice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAdvice;
