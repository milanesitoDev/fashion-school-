import React, { useState } from 'react';
import CreateCourseForm from './createCourseForm';
import DeleteCourseForm from './deleteCourseForm';
import CoursesList from './coursesList';
import GetCourseForm from './getCourseForm';
import UpdateCourseForm from './updateCourseForm';

interface ApiProps {
  courseId?: number;
}

const ApiManagerCourse: React.FC<ApiProps> = ({ courseId }) => {
  const [selectedApi, setSelectedApi] = useState<string>('');

  const renderApiComponent = () => {
    switch (selectedApi) {
      case 'CreateCourseForm':
        return <CreateCourseForm />;
      case 'DeleteCourseForm':
        return <DeleteCourseForm />;
      case 'CoursesList':
        return <CoursesList />;
      case 'GetCourseForm':
        return <GetCourseForm />;
      case 'UpdateCourseForm':
        return <UpdateCourseForm />;
      default:
        return <p>Select an API to interact with.</p>;
    }
  };

  return (
    <section className="ManagerCourse">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">API Manager Course</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
          <button
            onClick={() => setSelectedApi('CreateCourseForm')}
            className="text-center text-lg font-medium"
          >
            Create Course
          </button>
          <button
            onClick={() => setSelectedApi('DeleteCourseForm')}
            className="text-center text-lg font-medium"
          >
            Delete Course
          </button>
          <button
            onClick={() => setSelectedApi('CoursesList')}
            className="text-center text-lg font-medium"
          >
            Get All Courses
          </button>
          <button
            onClick={() => setSelectedApi('GetCourseForm')}
            className="text-center text-lg font-medium"
          >
            Get Course
          </button>
          <button
            onClick={() => setSelectedApi('UpdateCourseForm')}
            className="text-center text-lg font-medium"
          >
            Update Course
          </button>
        </div>
        <div>{renderApiComponent()}</div>
      </div>
    </section>
  );
};

export default ApiManagerCourse;