import React, { useState } from 'react';
import axios from 'axios';

const DELETE_FILE_ACTIVITY_URL = 'http://18.222.67.121/api/files_activity';

const DeleteFileActivity: React.FC = () => {
  const [fileActivityId, setFileActivityId] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleFileActivityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileActivityId(Number(e.target.value));
  };

  const handleDeleteFileActivity = async () => {
    setResponseMessage('');
    if (fileActivityId === null) {
      setResponseMessage('Please enter a valid file activity ID');
      return;
    }

    try {
      const response = await axios.delete(`${DELETE_FILE_ACTIVITY_URL}/${fileActivityId}`);
      if (response.status === 200) {
        setResponseMessage('File activity was deleted successfully');
      } else {
        setResponseMessage('Failed to delete file activity');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage('File activity not found');
          } else if (error.response.status === 500) {
            setResponseMessage('Internal server error while trying to delete the file');
          } else {
            setResponseMessage('An error occurred: ' + error.message);
          }
        } else {
          setResponseMessage('An error occurred: ' + error.message);
        }
      } else {
        setResponseMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Delete File Activity</h2>
      <div>
        <label>
          File Activity ID:
          <input
            type="number"
            name="fileActivityId"
            value={fileActivityId || ''}
            onChange={handleFileActivityIdChange}
            required
          />
        </label>
      </div>
      <button onClick={handleDeleteFileActivity}>Delete File Activity</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DeleteFileActivity;
