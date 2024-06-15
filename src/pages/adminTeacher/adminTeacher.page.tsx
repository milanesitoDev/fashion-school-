import Navbar from "../../components/navbar/navbar.component";
import ProfileCard from "../../components/ProfileCard/profileCard.component";
import Students from "../../components/students/students.component";
import ChatMessages from "../../components/chatMessages/chatMessages.components";

import "./adminTeacher.page.css";

const AdminTeacher: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="admin-teacher__container">
        <aside></aside>
        <main className="admin-teacher">
          <ProfileCard />
          <div className="admin-teacher__wrapper">
            <Students />
            <ChatMessages />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminTeacher;
