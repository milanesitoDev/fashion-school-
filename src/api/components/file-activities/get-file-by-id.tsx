import React, { useState } from 'react';
import axios from 'axios';

const GET_FILE_BY_ID_URL = 'http://18.222.67.121/api/files_activity';

const GetFileById: React.FC = () => {
  const [fileId, setFileId] = useState<number | null>(null);
  const [file, setFile] = useState<{ id: number, activity_id: number, file_url: string, description: string, type_file: string } | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleFileIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileId(Number(e.target.value));
  };

  const handleGetFileById = async () => {
    setResponseMessage('');
    if (fileId === null) {
      setResponseMessage('Please enter a valid file ID');
      return;
    }

    try {
      const response = await axios.get(`${GET_FILE_BY_ID_URL}/${fileId}`);
      if (response.status === 200) {
        setFile(response.data.data);
        setResponseMessage('File retrieved successfully');
      } else {
        setResponseMessage('Failed to retrieve file');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage('Activity not found or no files associated with the activity');
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
      <h2>Get File by ID</h2>
      <div>
        <label>
          File ID:
          <input
            type="number"
            name="fileId"
            value={fileId || ''}
            onChange={handleFileIdChange}
            required
          />
        </label>
      </div>
      <button onClick={handleGetFileById}>Get File</button>
      {responseMessage && <p>{responseMessage}</p>}
      {file && (
        <div>
          <h3>File Details</h3>
          <p><strong>File URL:</strong> <a href={file.file_url} target="_blank" rel="noopener noreferrer">{file.file_url}</a></p>
          <p><strong>Description:</strong> {file.description}</p>
          <p><strong>Type:</strong> {file.type_file}</p>
        </div>
      )}
    </div>
  );
};

export default GetFileById;
 