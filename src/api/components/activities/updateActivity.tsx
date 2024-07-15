import React, { useState } from "react";
import axios from "axios";

const UPDATE_ACTIVITY_URL = 'http://18.222.67.121/api/activities';

interface ActivityUpdate {
  name: string;
  video_url: string;
  text: string;
  calification: number;
}

interface UpdateActivityProps {
  activityId: number;
}

const UpdateActivity: React.FC<UpdateActivityProps> = ({ activityId }) => {
  const [activity, setActivity] = useState<ActivityUpdate>({
    name: "",
    video_url: "",
    text: "",
    calification: 0,
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: name === "calification" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`${UPDATE_ACTIVITY_URL}/${activityId}`, activity);

      if (response.status === 200) {
        setMessage("Activity updated successfully");
      } else {
        setMessage("Failed to update activity");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Validation error: " + JSON.stringify(error.response.data.errors));
          } else if (error.response.status === 404) {
            setMessage("Activity not found");
          } else if (error.response.status === 500) {
            setMessage("Server error: " + error.response.data.errors);
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
      <h2>Update Activity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={activity.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Video URL:
            <input
              type="url"
              name="video_url"
              value={activity.video_url}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Text:
            <textarea
              name="text"
              value={activity.text}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Calification:
            <input
              type="number"
              name="calification"
              value={activity.calification}
              onChange={handleChange}
              step="0.1"
              required
            />
          </label>
        </div>
        <button type="submit">Update Activity</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateActivity;
