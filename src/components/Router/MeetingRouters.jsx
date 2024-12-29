import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Dashboard from '../Meeting/Dashboard';
import ScheduleMeeting from '../Meeting/ScheduleMeeting';
import MeetingList from '../Meeting/MeetingList';
import Users from '../Meeting/Users';
import InvitationList from '../Meeting/InvitationList';
import Settings from '../Meeting/Settings';
import Analytics from '../Meeting/Analytics';
import MeetingPlanner from '../../assets/MeetingPlanner.jpeg';
import scheduleMeetingImg from '../../assets/ScheduleMeeting.png';
import meetingPlannerImage from '../../assets/meetingPlannerImage.jpeg';
import Login from '../../Login'; 


const MeetingRouters = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const handleSignIn = () => {
    const credentials = [
      { username: 'admin', password: 'password' },
      { username: 'user', password: 'password' },
      { username: 'guest', password: 'password' },
    ];

    const inputUsername = prompt('Enter username:');
    const inputPassword = prompt('Enter password:');

    const validCredential = credentials.find(
      cred => cred.username === inputUsername && cred.password === inputPassword
    );

    if (validCredential) {
      localStorage.setItem('authToken', 'your-simulated-jwt-token');
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} handleSignIn={handleSignIn} />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="meetings" element={isAuthenticated ? <MeetingList /> : <Navigate to="/" />} />
          <Route path="schedule-meeting" element={isAuthenticated ? <ScheduleMeeting /> : <Navigate to="/" />} />
          <Route path="users" element={isAuthenticated ? <Users /> : <Navigate to="/" />} />
          <Route path="invitations" element={isAuthenticated ? <InvitationList /> : <Navigate to="/" />} />
          <Route path="settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
          <Route path="analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/" />} />

          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact isAuthenticated={isAuthenticated} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const Home = ({ isAuthenticated, handleSignIn }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to MeetingApp</h1>
      <div className="btn-group">
        {isAuthenticated ? (
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        ) : (
          <button className="btn btn-success" onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </div>
  );
};



const About = () => (
  <div className="container-fluid row my-5">
    <div className="col-md-6 my-5 py-5">
      <h2>Meeting Calendar App</h2>
      <p>
        The Meeting Calendar platform offers individuals and enterprises an efficient way to schedule meetings. Customers can easily manage their appointments by updating or cancelling as needed.
      </p>
    </div>
    <div className="col-md-6 my-5" style={{ width: '400px' }}>
      <img src={meetingPlannerImage} alt="Meeting Planner" style={{ width: '40%', height: 'auto' }} />
    </div>
  </div>
);

const Services = () => (
  <div className="container-fluid my-5">
    <div className="mx-5">
      <h3>Meeting Scheduling Tools</h3>
      <img src={scheduleMeetingImg} alt="Schedule Meeting" style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
      <p>This website helps users plan and organize meetings by finding suitable times for participants.</p>
    </div>
  </div>
);

const Contact = ({ isAuthenticated, handleSignIn, handleSignOut }) => (
  <div className="container my-5 px-3">
    <h2>Contact Us</h2>
    <p>Feel free to contact us.</p>
    <p>Email: <a href="mailto:john@test.com">john@test.com</a></p>
    <div className="col-md-8 my-5">
      <img src={MeetingPlanner} alt="Meeting Planner" className="img-fluid" />
    </div>
    <div className="col-md-6 my-5">
      <h3>Get in Touch</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="form-control" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" className="form-control" rows="4" placeholder="Write your message" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
      {isAuthenticated ? (
        <button className="btn btn-outline-warning mt-3" onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button className="btn btn-outline-success mt-3" onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  </div>
);

const PageNotFound = () => (
  <div className="container">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default MeetingRouters;
