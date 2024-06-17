import React, { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
  id: number;
  comment: string;
  user_name: string;
  rol: string;
  date: string;
}

interface CommentsResponse {
  message: string;
  status: number;
  data: Comment[];
}

const CommentsAppdeam: React.FC<{ id: number }> = ({ id }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserComments(activityId: number) {
      try {
        const response = await axios.get<CommentsResponse>(`http://18.222.67.121/api/comments/activity/${activityId}`);
        
        if (response.status === 200 && response.data.message === "success") {
          setComments(response.data.data);
        } else if (response.status === 404) {
          setError("Comments not found");
        } else {
          setError("An unexpected error occurred");
        }
      } catch (error) {
        setError("An error occurred while fetching comments");
      }
    }

    getUserComments(id);
  }, [id]);

  return (
    <div>
      {error && <p>{error}</p>}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>{comment.user_name} ({comment.rol})</p>
              <p>{new Date(comment.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CommentsAppdeam;
