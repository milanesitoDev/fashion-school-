import React, { useState } from 'react';
import CreateSchedule from './createSchedule';
import DeleteSchedule from './deleteSchedule';
import StudentSchedule from './studentSchedule';
import TeacherSchedule from './teacherSchedule';
import UpdateSchedule from './updateSchedule';



const ApiManagerSchedule: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>('');

  const renderApiComponent = () => {
    switch (selectedApi) {
      case 'CreateSchedule':
        return <CreateSchedule />;
      case 'DeleteSchedule':
        return <DeleteSchedule />;
      case 'StudentSchedule':
        return <StudentSchedule />;
      case 'TeacherSchedule':
        return <TeacherSchedule teacherId={3}/>;
      case 'UpdateSchedule':
        return <UpdateSchedule />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerSchedule">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Schedule</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <button onClick={() => setSelectedApi('CreateSchedule')} className="text-center text-lg font-medium">Create Schedule</button>
          <button onClick={() => setSelectedApi('DeleteSchedule')} className="text-center text-lg font-medium">Delete Schedule</button>
          <button onClick={() => setSelectedApi('StudentSchedule')} className="text-center text-lg font-medium">Get Student Schedule</button>
          <button onClick={() => setSelectedApi('TeacherSchedule')} className="text-center text-lg font-medium">Get Teacher Schedule</button>
          <button onClick={() => setSelectedApi('UpdateSchedule')} className="text-center text-lg font-medium">Update Schedule</button>
        </div>
        <div>
          {renderApiComponent()}
        </div>
      </div>
    </section>
  );
};

export default ApiManagerSchedule;
