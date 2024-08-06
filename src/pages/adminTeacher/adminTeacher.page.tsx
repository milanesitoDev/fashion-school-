import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/ProfileCard/profileCard.component";
import Students from "../../components/students/students.component";
import Card_course  from '../../components/flowbite/card';
import Card_course2  from '../../components/flowbite/card2';
import Card_course3  from '../../components/flowbite/card3';
import Card_course4  from '../../components/flowbite/card4';
import Pagina  from '../../components/flowbite/pagination';
import GetEvents from '../../api/components/schedules/returnScheduleteacher';

import "./adminTeacher.page.css";
import "../../components/flowbite/card.page.css";

/*
https://stackoverflow.com/questions/72401421/message-npm-warn-config-global-global-local-are-deprecated-use-loc
userteacher@gmail.com
cb7327dd*/

type teacher = {
  name: string;
  location: string;
  phone: string;
  email: string;
};

type student = {
  name: string;
};

type message = {
  text: string;
  time: Date;
};

type chat = {
  chat: string;
  messages: message[];
};

interface AdminTeacherProps {
  teacherData: teacher;
  students: student[];
  messages: chat[];
}
// <Students students={[students]} /> <ChatMessages messages={messages} /> <Card_course/>   
const AdminTeacher: React.FC<AdminTeacherProps> = ({
  teacherData,
  students,
  messages,
}) => {
  return (
    <>
      <Navbar />
      <div className="admin-teacher__container">
        <aside></aside>
        <main className="admin-teacher">
          <ProfileCard teacherData={teacherData} />
          <div className="admin-teacher__wrapper">
            <Students  />  
            <GetEvents />          
          </div>

          <div className="students">
          <div className="students__wrapper">
            <div className="wrapper__text">
              <h3 className="students__title">Cursos del profesor</h3>
              <p className="students__text">
                Tienes <span className="text-number">4</span> cursos
              </p>
            </div>
           
          </div>
          <div className="students__list">
          <div className="admin-teacher__course">
          <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4 ">
       
        </div>
        </div>
      
          </div>
          <Pagina />
        </div>  

        </main>  
           
      </div>
    </>
  );
};

export default AdminTeacher;
