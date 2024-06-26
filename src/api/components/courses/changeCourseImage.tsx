import React, { useState } from 'react';
import axios from 'axios';

const CHANGE_IMAGE_URL = 'http://18.222.67.121/api/courses/';

interface ChangeImageResponse {
  message: string;
  status: number;
  data: string; // URL de la nueva imagen
}

const ChangeCourseImage: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post<ChangeImageResponse>(
        `${CHANGE_IMAGE_URL}${courseId}/change_image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Image changed successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage('Bad request: ' + error.response.data.message);
          } else if (error.response.status === 404) {
            setMessage('User not found');
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
      <h2>Change Course Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Upload Image</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeCourseImage;