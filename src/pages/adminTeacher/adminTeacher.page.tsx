import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/profileCard/profileCard.component";
import Students from "../../components/students/students.component";
import ChatMessages from "../../components/chatMessages/chatMessages.component";

import "./adminTeacher.page.css";

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
            <Students students={students} />
            <ChatMessages messages={messages} />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminTeacher;
