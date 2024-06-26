import React, { useState } from 'react';
import axios from 'axios';

const POST_FILE_ACTIVITY_URL = 'http://18.222.67.121/api/files_activity';

const UpdateFileActivity: React.FC = () => {
  const [fileActivityId, setFileActivityId] = useState<number | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleFileActivityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileActivityId(Number(e.target.value));
  };

  const handleFileUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUrl(e.target.value);
  };

  const handleUpdateFileActivity = async () => {
    setResponseMessage('');
    if (fileActivityId === null || fileUrl.trim() === '') {
      setResponseMessage('Please enter a valid file activity ID and URL');
      return;
    }

    try {
      const response = await axios.post(`${POST_FILE_ACTIVITY_URL}/${fileActivityId}`, {
        url: fileUrl
      });
      if (response.status === 200) {
        setResponseMessage('File or URL updated successfully');
      } else {
        setResponseMessage('Failed to update file or URL');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage('File activity not found');
          } else if (error.response.status === 400) {
            setResponseMessage('Bad request due to validation or business logic error');
          } else if (error.response.status === 500) {
            setResponseMessage('Internal server error while processing the request');
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
      <h2>Update File or URL for Activity</h2>
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
      <div>
        <label>
          File URL:
          <input
            type="text"
            name="fileUrl"
            value={fileUrl}
            onChange={handleFileUrlChange}
            required
          />
        </label>
      </div>
      <button onClick={handleUpdateFileActivity}>Update File or URL</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateFileActivity;