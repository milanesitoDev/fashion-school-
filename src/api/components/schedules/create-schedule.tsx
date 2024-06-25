import React, { useState } from "react";
import axios from "axios";


const CREATE_SCHEDULE_URL = '/schedules';

interface Schedule {
  activity_id: number;
  teacher_id: number;
  start_hour: string;
  end_hour: string;
}

const CreateSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>({
    activity_id: 1,
    teacher_id: 1,
    start_hour: "",
    end_hour: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(CREATE_SCHEDULE_URL, schedule);

      if (response.status === 201) {
        setMessage("Schedule created successfully");
      } else {
        setMessage("Failed to create schedule");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage("Validation error: " + JSON.stringify(error.response.data.errors));
          } else if (error.response.status === 500) {
            setMessage("Internal server error: " + error.response.data.errors);
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
      <h2>Create New Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Activity ID:
            <input
              type="number"
              name="activity_id"
              value={schedule.activity_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Teacher ID:
            <input
              type="number"
              name="teacher_id"
              value={schedule.teacher_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Start Hour:
            <input
              type="datetime-local"
              name="start_hour"
              value={schedule.start_hour}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            End Hour:
            <input
              type="datetime-local"
              name="end_hour"
              value={schedule.end_hour}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Create Schedule</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateSchedule;
