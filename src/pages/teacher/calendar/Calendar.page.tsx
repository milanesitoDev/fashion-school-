import React from "react";

import Navbar from "../../../components/navbar/navbar.component";

import "./Calendar.page.css";
import ProfileCard from "../../../components/ProfileCard/profileCard.component";
import GetEvents from '../../../api/components/schedules/returnScheduleteacher';
import {Calendar} from '../../../components/fullCalendar/fullcalendar';
import CoursesTeacher from '../../../api/components/courses/returnCoursesByTeacher';
import Divider from '@mui/joy/Divider';

type teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};

// send
type TeacherId = {
  id: number;  
}; 


const DataTeacher:TeacherId  = {
  id:3
}
interface AdminTeacherProps {
  teacherData: teacher;
}

const AdminCalendar: React.FC<AdminTeacherProps> =  ({
  teacherData,
}) => {
  // <div><Button size="sm" className='left-full text-white  font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-cyan-950 dark:hover:bg-cyan-500 focus:outline-none '>Nuevo Evento</Button></div>
      // <ListClass TeacherId={DataTeacher}/>      
  return (
    <>
      <Navbar />
      <div className="admin-calendar__container">
        <aside></aside>
        <main className="admin-calendar">
          <ProfileCard teacherData={teacherData} />
          <div className="admin-calendar__info">
            <h2 className="admin-calendar__name">Nombre de la carrera</h2>
            <ul className="admin-calendar__list">
              <li>Curso</li>
              <li>Estudiantes</li>
              <li className="list--bold">Calendario</li>
            </ul>
            <p className="admin-calendar__month">mayo 2024</p>
            <h2 className="admin-calendar__name ui-serif text-blue-900 ">Calendario</h2>
            <div className="pt-4">
              <CoursesTeacher TeacherId={DataTeacher}/>
             
            </div>
         
            <Divider />
            <div className="pt- box-content h-150 w-full p-4 border-4">
             
              <GetEvents />
            <Calendar />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminCalendar;
