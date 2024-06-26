import React, { useState } from 'react';
import axios from 'axios';

const CHANGE_IMAGE_URL = 'http://18.222.67.121/api/advices';

const ChangeAdviceImage: React.FC = () => {
  const [adviceId, setAdviceId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdviceId(Number(e.target.value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (adviceId === null || imageFile === null) {
      setMessage("Please enter a valid advice ID and select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(`${CHANGE_IMAGE_URL}/${adviceId}/change_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage("Image updated successfully");
      } else {
        setMessage("Failed to update image");
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
      <h2>Change Advice Image</h2>
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
            Select Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <button type="submit">Change Image</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeAdviceImage;
