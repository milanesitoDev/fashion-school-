import React, { useState, useEffect } from "react";
import axios from "axios";

interface Activity {
  name: string;
  course_id: number;
  video_url: string;
  description: string;
  activity_type: number;
  created_at: string;
  updated_at: string;
}

const RecoverActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://18.222.67.121/api/activities`);
        
        if (response.status === 200) {
          setActivities(response.data.data);
          setMessage(response.data.message);
        } else {
          setMessage("Failed to retrieve activities");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404) {
            setMessage("Activities not found");
          } else {
            setMessage("An error occurred: " + error.message);
          }
        } else {
          setMessage("An unexpected error occurred");
        }
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {message && <p>{message}</p>}
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <h3>{activity.name}</h3>
            <p>Course ID: {activity.course_id}</p>
            <p>Video URL: <a href={activity.video_url} target="_blank" rel="noopener noreferrer">{activity.video_url}</a></p>
            <p>Description: {activity.description}</p>
            <p>Activity Type: {activity.activity_type}</p>
            <p>Created At: {new Date(activity.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(activity.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecoverActivities;
