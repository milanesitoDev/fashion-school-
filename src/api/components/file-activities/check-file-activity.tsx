import React, { useState } from "react";
import axios from "axios";

const CHECK_FILE_ACTIVITY_URL = 'http://18.222.67.121/file_detail';

interface CheckFileActivityProps {
  activityFileId: number;
  studentId: number;
}

const CheckFileActivity: React.FC<CheckFileActivityProps> = ({ activityFileId, studentId }) => {
  const [message, setMessage] = useState<string>("");

  const checkFileActivity = async () => {
    setMessage("");

    try {
      const response = await axios.post(`${CHECK_FILE_ACTIVITY_URL}/${activityFileId}/by/${studentId}`);

      if (response.status === 201) {
        setMessage("The file activity check has been created successfully.");
      } else {
        setMessage("Failed to check file activity.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Bad request: " + error.response.data.error);
          } else if (error.response.status === 500) {
            setMessage("Internal server error: " + error.response.data.error);
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
      <h2>Check File Activity</h2>
      <button onClick={checkFileActivity}>Check Activity</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckFileActivity;
