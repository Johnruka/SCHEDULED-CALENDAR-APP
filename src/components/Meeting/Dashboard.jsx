import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MeetingList from "../Meeting/MeetingList";
import { FaCalendarPlus } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";



const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={{ display: "flex align-items-left", height: "100vh" }}>
      
      <aside
        style={{
          width: "250px",
          background: "#f8f9fa",
          padding: "16px",
          borderRight: "1px solid #ddd ",
          
        }}
      >
        <h3>Dashboard</h3>
       
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2">
              <FaCalendarPlus />
              Schedule Meeting {() => navigate("/dashboard/ScheduleMeeting")}
              </button>
            </li>
            <li>
              <button
                 >
            </button>
                 <button className="btn btn-outline-primary w-100 mb-2">
                 <FaCalendar />
                 Manage Meetings {() => navigate("/dashboard/MeetingList")}
              </button>
            </li>
            <li>
              <button
                >
               </button>
               <button className="btn btn-outline-primary w-100 mb-2">
               <FaUsers />
               Users & Permissions {() => navigate("/dashboard/Users")}
              </button>
              </li>
            <li>
              <button
                >
                   </button>
                   <button className="btn btn-outline-primary w-100 mb-2">
                   <IoIosNotifications />
                   Notifications {() => navigate("/dashboard/Notifications")}
              </button>
              </li>
            <li>
              <button
               >
                   </button>
                   <button className="btn btn-outline-primary w-100 mb-2">
                   <BsGraphUpArrow />
                   Analytics  {() => navigate("/dashboard/Analytics")}
              </button>
              </li>
            <li>
              <button
                >
                  
                 </button>
                   <button className="btn btn-outline-primary w-100 mb-2">
                   <IoSettingsSharp />
                   Settings {() => navigate("/dashboard/Settings")}
                   
                     
              </button>
              </li>
            <li>
              <button
                >             
                </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "10px" }}>
        <Routes>
         
          <Route path="Meetings" element={<MeetingList />} />
        
         
          
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;