import React, { useState } from "react";
import axios from "axios";

interface AddComment {
  activity_id: number;
  user_id: number;
  comment: string;
}

const AddComment: React.FC = () => {
  const [commentData, setCommentData] = useState<AddComment>({
    activity_id: 1, // ID de la actividad inicial
    user_id: 20, // ID del usuario inicial (estudiante)
    comment: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentData((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post('http://18.222.67.121/api/comments', commentData);

      if (response.status === 201) {
        setMessage("Comment added successfully");
      } else {
        setMessage("Failed to add comment");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Validation error: " + JSON.stringify(error.response.data.errors));
          } else if (error.response.status === 404) {
            setMessage("Activity not found");
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
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Activity ID:
            <input
              type="number"
              name="activity_id"
              value={commentData.activity_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            User ID:
            <input
              type="number"
              name="user_id"
              value={commentData.user_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Comment:
            <textarea
              name="comment"
              value={commentData.comment}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Comment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddComment;
