import React, { useState } from "react";
import axios from "axios";

interface CommentData {
  activity_id: number;
  user_id: number;
  comment: string;
}

const CreateComments: React.FC = () => {
  const [activityId, setActivityId] = useState<number>(1);
  const [userId, setUserId] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const commentData: CommentData = {
      activity_id: activityId,
      user_id: userId,
      comment,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments`, commentData);
      
      if (response.status === 201 && response.data.message === "created") {
        setMessage("Comment created successfully");
      } else {
        setMessage("Failed to create comment: " + response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          setMessage("Validation error: " + error.response.data.error);
        } else if (error.response && error.response.status === 500) {
          setMessage("Internal server error: " + error.response.data.error);
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
      <form onSubmit={handleCreateComment}>
        <div>
          <label>Activity ID</label>
          <input
            type="number"
            value={activityId}
            onChange={(e) => setActivityId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Comment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateComments;
