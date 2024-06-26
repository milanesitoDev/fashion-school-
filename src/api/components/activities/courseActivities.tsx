import React, { useState } from "react";
import axios from "axios";

const GET_ACTIVITIES_BY_COURSE_URL = 'http://18.222.67.121/api/activities/course';

interface Activity {
  name: string;
  course_id: number;
  video_url: string;
  description: string;
  activity_type: number;
  created_at: string;
  updated_at: string;
}

interface CourseActivitiesProps {
  courseId: number;
}

const CourseActivities: React.FC<CourseActivitiesProps> = ({ courseId }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [message, setMessage] = useState<string>("");

  const fetchActivities = async () => {
    setMessage("");
    try {
      const response = await axios.get(`${GET_ACTIVITIES_BY_COURSE_URL}/${courseId}`);

      if (response.status === 200) {
        setActivities(response.data.data);
        setMessage("Activities retrieved successfully");
      } else {
        setMessage("Failed to retrieve activities");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Course not found or no activities found for the course");
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
      <h2>Course Activities</h2>
      <button onClick={fetchActivities}>Fetch Activities</button>
      {message && <p>{message}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.created_at}>
            <h3>{activity.name}</h3>
            <p>Description: {activity.description}</p>
            <p>Video URL: <a href={activity.video_url} target="_blank" rel="noopener noreferrer">{activity.video_url}</a></p>
            <p>Activity Type: {activity.activity_type}</p>
            <p>Created At: {activity.created_at}</p>
            <p>Updated At: {activity.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseActivities;
