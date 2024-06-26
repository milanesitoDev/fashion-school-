import React, { useState } from 'react';
import axios from 'axios';

const GET_FILES_ACTIVITY_FOR_STUDENT_URL = 'http://18.222.67.121/api/files_activity';

const GetFilesForActivityAndStudent: React.FC = () => {
  const [activityId, setActivityId] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [files, setFiles] = useState<Array<{ id: number, activity_id: number, file_url: string, description: string, type_file: string, was_cheked: boolean }>>([]);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleActivityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityId(Number(e.target.value));
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(Number(e.target.value));
  };

  const handleGetFilesForActivityAndStudent = async () => {
    setResponseMessage('');
    if (activityId === null || studentId === null) {
      setResponseMessage('Please enter valid activity ID and student ID');
      return;
    }

    try {
      const response = await axios.get(`${GET_FILES_ACTIVITY_FOR_STUDENT_URL}/${activityId}/by/${studentId}`);
      if (response.status === 200) {
        setFiles(response.data.data);
        setResponseMessage('Files retrieved successfully');
      } else {
        setResponseMessage('Failed to retrieve files');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setResponseMessage('Bad request: student or file activity not found');
          } else if (error.response.status === 404) {
            setResponseMessage('No files found for the activity');
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
      <h2>Get Files for Activity and Student</h2>
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
          Student ID:
          <input
            type="number"
            name="studentId"
            value={studentId || ''}
            onChange={handleStudentIdChange}
            required
          />
        </label>
      </div>
      <button onClick={handleGetFilesForActivityAndStudent}>Get Files</button>
      {responseMessage && <p>{responseMessage}</p>}
      {files.length > 0 && (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              <p><strong>File URL:</strong> <a href={file.file_url} target="_blank" rel="noopener noreferrer">{file.file_url}</a></p>
              <p><strong>Description:</strong> {file.description}</p>
              <p><strong>Type:</strong> {file.type_file}</p>
              <p><strong>Was Checked:</strong> {file.was_cheked ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetFilesForActivityAndStudent;
