import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MeetingList from "../Meeting/MeetingList";
import { FaCalendarPlus, FaCalendar, FaUsers, FaEnvelopeOpen } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import ScheduleMeeting from "./ScheduleMeeting";
import Users from "./Users";
import InvitationList from "./InvitationList";
import Settings from './Settings'
import Analytics from "./Analytics";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex", 
        height: "100vh", 
        width: "100%",
       
      }}
    >
      <aside
        style={{
          width: "250px", 
          backgroundColor: "#f8f9fa", 
          height: "100%", 
          padding: "16px", 
          boxSizing: "border-box",
          
        }}
      >
        <h3>Dashboard</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2"
              onClick={() => navigate("/dashboard/ScheduleMeeting")}
              >
                <FaCalendarPlus />
                Schedule Meeting
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("/dashboard/MeetingList")}
              >
                <FaCalendar />
                Manage Meetings
              </button>
            </li>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2"
              onClick={() => navigate("/dashboard/users")}
              >
                <FaUsers />
                Users & Permissions 
              </button>
            </li>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2"
               onClick={() => navigate("/dashboard/Invitations")}
               >
                <FaEnvelopeOpen />
                Invitations 
              </button>
            </li>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2"
               onClick={() => navigate("/dashboard/Analytics")}
               >
                <BsGraphUpArrow />
                Analytics 
              </button>
            </li>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2"
              onClick={() => navigate("/dashboard/settings")}
              >
                <IoSettingsSharp />
                Settings 
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main
        style={{
          flex: 1, 
          backgroundColor: "#e9ecef", 
          padding: "16px", 
          boxSizing: "border-box",
        }}
      >
        <Routes>
          <Route path="MeetingList" element={<MeetingList />} />
          <Route path="ScheduleMeeting" element={<ScheduleMeeting />} />
          <Route path="Users" element={<Users />} />
          <Route path="Invitations" element={<InvitationList />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
