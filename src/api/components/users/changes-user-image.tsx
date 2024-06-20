import React, { useState } from "react";
import axios from "axios";

const CHANGE_IMAGE_URL = 'http://18.222.67.121/api/users';

interface ChangeUserImageProps {
  userId: number;
}

const ChangeUserImage: React.FC<ChangeUserImageProps> = ({ userId }) => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.patch(`${CHANGE_IMAGE_URL}/${userId}/change_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
            setMessage("Bad request: " + JSON.stringify(error.response.data.error));
          } else if (error.response.status === 404) {
            setMessage("User not found");
          } else if (error.response.status === 500) {
            setMessage("Internal server error: " + error.response.data.error);
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
      <h2>Change User Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
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

export default ChangeUserImage;
