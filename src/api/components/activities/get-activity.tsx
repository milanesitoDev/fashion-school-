import React, { useState } from "react";
import axios from "axios";

const GET_ACTIVITY_URL = 'http://18.222.67.121/api/activities';

interface Activity {
  name: string;
  course_id: number;
  video_url: string;
  description: string;
  activity_type: number;
  created_at: string;
  updated_at: string;
}

interface GetActivityProps {
  activityId: number;
}

const GetActivity: React.FC<GetActivityProps> = ({ activityId }) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [message, setMessage] = useState<string>("");

  const fetchActivity = async () => {
    setMessage("");
    setActivity(null);

    try {
      const response = await axios.get(`${GET_ACTIVITY_URL}/${activityId}`);

      if (response.status === 200) {
        setActivity(response.data);
      } else {
        setMessage("Failed to fetch activity.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Activity not found.");
          } else {
            setMessage("An error occurred: " + error.message);
          }
        } else {
          setMessage("An error occurred: " + error.message);
        }
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>Get Activity</h2>
      <button onClick={fetchActivity}>Fetch Activity</button>
      {message && <p>{message}</p>}
      {activity && (
        <div>
          <h3>{activity.name}</h3>
          <p><strong>Course ID:</strong> {activity.course_id}</p>
          <p><strong>Description:</strong> {activity.description}</p>
          <p><strong>Video URL:</strong> <a href={activity.video_url}>{activity.video_url}</a></p>
          <p><strong>Activity Type:</strong> {activity.activity_type}</p>
          <p><strong>Created At:</strong> {new Date(activity.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(activity.updated_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default GetActivity;
