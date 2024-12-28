import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FaCalendarPlus, FaCalendar, FaUsers, FaEnvelopeOpen } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import MeetingList from "../Meeting/MeetingList";
import ScheduleMeeting from "./ScheduleMeeting";
import Users from "./Users";
import InvitationList from "./InvitationList";
import Settings from './Settings';
import Analytics from "./Analytics";
import ProtectedRoute from './ProtectedRoute';
import Login from '../../Login'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
     <aside style={{ width: "250px", backgroundColor: "#f8f9fa", height: "100%", padding: "16px", boxSizing: "border-box" }}>
     <h3 style={{ marginBottom: "24px", color: "#007bff", fontWeight: "bold" , textAlign: "center" }}>Dashboard</h3> 
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-start" onClick={() => navigate("/dashboard/ScheduleMeeting")}>
                <FaCalendarPlus className="me-2" style={{ fontSize: '1.2rem' }} /> Schedule Meeting
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-start" onClick={() => navigate("/dashboard/MeetingList")}>
                <FaCalendar className="me-2" style={{ fontSize: '1.2rem' }} /> Manage Meetings
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-start" onClick={() => navigate("/dashboard/Users")}>
                <FaUsers className="me-2" style={{ fontSize: '1.2rem' }} /> Users & Permissions
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-start" onClick={() => navigate("/dashboard/Invitations")}>
                <FaEnvelopeOpen className="me-2" style={{ fontSize: '1.2rem' }} /> Invitations
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-start" onClick={() => navigate("/dashboard/Analytics")}>
                <BsGraphUpArrow className="me-2" style={{ fontSize: '1.2rem' }} /> Analytics
              </button>
            </li>
            <li>
              <button className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-start" onClick={() => navigate("/dashboard/Settings")}>
                <IoSettingsSharp className="me-2" style={{ fontSize: '1.2rem' }} /> Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, backgroundColor: "#e9ecef", padding: "16px", boxSizing: "border-box" }}>
        <Routes>
          <Route path="MeetingList" element={<ProtectedRoute element={MeetingList} />} />
          <Route path="ScheduleMeeting" element={<ProtectedRoute element={ScheduleMeeting} />} />
          <Route path="Users" element={<ProtectedRoute element={Users} />} />
          <Route path="Invitations" element={<ProtectedRoute element={InvitationList} />} />
          <Route path="Settings" element={<ProtectedRoute element={Settings} />} />
          <Route path="Analytics" element={<ProtectedRoute element={Analytics} />} />
          <Route path="Login" element={<ProtectedRoute element={Login} />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
