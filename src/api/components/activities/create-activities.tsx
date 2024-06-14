import React, { useState } from "react";
import axios from "axios";

interface CreateActivity {
  course_id: number;
  name: string;
  video_url: string;
  description: string;
  type_id: number;
}

const CreateActivities: React.FC = () => {
  const [activity, setActivity] = useState<CreateActivity>({
    course_id: 0,
    name: "",
    video_url: "",
    description: "",
    type_id: 0,
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/activities`, activity);

      if (response.status === 201) {
        setMessage("Activity created successfully");
      } else {
        setMessage("Failed to create activity");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          setMessage("Validation error: " + error.response.data.error);
        } else if (error.response && error.response.status === 404) {
          setMessage("Course not found");
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
      <h2>Create Activity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Course ID:
            <input
              type="number"
              name="course_id"
              value={activity.course_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
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
            Description:
            <textarea
              name="description"
              value={activity.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Type ID:
            <input
              type="number"
              name="type_id"
              value={activity.type_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Create Activity</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateActivities;
