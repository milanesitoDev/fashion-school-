import React, { useState } from 'react';
import axios from 'axios';

const POST_FILE_ACTIVITY_URL = 'http://18.222.67.121/api/files_activity';

const AddFileToActivity: React.FC = () => {
  const [activityId, setActivityId] = useState<number | null>(null);
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleActivityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityId(Number(e.target.value));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddFileToActivity = async () => {
    setResponseMessage("");

    if (activityId === null || (url === '' && file === '') || description === '') {
      setResponseMessage("Please fill in all required fields");
      return;
    }

    const payload = {
      activity_id: activityId,
      url: url,
      file: file,
      description: description
    };

    try {
      const response = await axios.post(POST_FILE_ACTIVITY_URL, payload);

      if (response.status === 201) {
        setResponseMessage("The file or URL has been added successfully");
      } else {
        setResponseMessage("Failed to add the file or URL");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setResponseMessage("Bad request due to failed validation or business logic error");
          } else if (error.response.status === 500) {
            setResponseMessage("Internal server error while processing the request");
          } else {
            setResponseMessage("An error occurred: " + error.message);
          }
        } else {
          setResponseMessage("An error occurred: " + error.message);
        }
      } else {
        setResponseMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Add File or URL to Activity</h2>
      <div>
        <label>
          Activity ID:
          <input
            type="number"
            name="activityId"
            value={activityId || ''}
            onChange={handleActivityIdChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <div>
        <label>
          File:
          <input
            type="text"
            name="file"
            value={file}
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </label>
      </div>
      <button onClick={handleAddFileToActivity}>Add File to Activity</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddFileToActivity;
