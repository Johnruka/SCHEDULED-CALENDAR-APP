import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MeetingList from "../Meeting/MeetingList";
import { FaCalendarPlus } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import ScheduleMeeting from "./ScheduleMeeting";
import Users from "./Users";
import InvitationList from "./InvitationList";
import Settings from './Settings'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex", // Flexbox layout
        height: "100vh", // Full viewport height
        width: "100%", // Full viewport width
      }}
    >
      {/* Left Column */}
      <aside
        style={{
          width: "250px", // Fixed width for the sidebar
          backgroundColor: "#f8f9fa", // Light gray background
          height: "100%", // Full height of the viewport
          padding: "16px", // Padding inside the sidebar
          boxSizing: "border-box", // Include padding in width/height calculations
        }}
      >
        <h3>Dashboard</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
            <button></button>
              <button className="btn btn-outline-primary w-100 mb-2"
              onClick={() => navigate("/dashboard/ScheduleMeeting")}
              >
                <FaCalendarPlus />
                Schedule Meeting
              </button>
            </li>
            <li>
              <button></button>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("/dashboard/MeetingList")}
              >
                <FaCalendar />
                Manage Meetings
              </button>
            </li>
            <li>
              <button></button>
              <button className="btn btn-outline-primary w-100 mb-2"
              onClick={() => navigate("/dashboard/users")}
              >
                <FaUsers />
                Users & Permissions 
              </button>
            </li>
            <li>
              <button></button>
              <button className="btn btn-outline-primary w-100 mb-2"
               onClick={() => navigate("/dashboard/Invitations")}
               >
                <IoIosNotifications />
                Invitations 
              </button>
            </li>
            <li>
              <button></button>
              <button className="btn btn-outline-primary w-100 mb-2"
               onClick={() => navigate("/dashboard/Analystics")}
               >
                <BsGraphUpArrow />
                Analytics 
              </button>
            </li>
            <li>
              <button></button>
              <button className="btn btn-outline-primary w-100 mb-2"
              onClick={() => navigate("/dashboard/settings")}
              >
                <IoSettingsSharp />
                Settings 
              </button>
            </li>
            <li>
              <button></button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Right Column */}
      <main
        style={{
          flex: 1, // Take up remaining space
          backgroundColor: "#e9ecef", // Slightly darker gray background
          padding: "16px", // Padding inside the main content
          boxSizing: "border-box", // Include padding in width/height calculations
        }}
      >
        <Routes>
          <Route path="MeetingList" element={<MeetingList />} />
          <Route path="ScheduleMeeting" element={<ScheduleMeeting />} />
          <Route path="Users" element={<Users />} />
          <Route path="Invitations" element={<InvitationList />} />
          <Route path="Settings" element={<Settings />} />



        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
