import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home isAuthenticated={isAuthenticated} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />} />
          <Route path='/home' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact isAuthenticated={isAuthenticated} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/meetings/*' element={<MeetingList />} />
          <Route path='/ScheduleMeeting/*' element={<ScheduleMeeting />} />
          <Route path='/Users/*' element={<Users />} />
          <Route path='/Invitations/*' element={<InvitationList />} />
          <Route path='/Settings/*' element={<Settings />} />
          <Route path='/Analytics/*' element={<Analytics />} />
          <Route path='/login/*' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Simulated sign-in logic
    const username = "admin";
    const password = "password";

    if (username === "admin" && password === "password") { // Simulated credentials check
      localStorage.setItem("authToken", "your-simulated-jwt-token");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignOut = () => {
    // Log out logic
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };


  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className='container'>
      <h1>Home Component</h1>
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={goToDashboard}>Navigate To Dashboard</button>
        <button className='btn btn-warning' onClick={() => navigate(-1)}>Back</button>
        {isAuthenticated ? (
          <button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button>
        ) : (
          <button className='btn btn-success' onClick={handleSignIn}>Sign In</button>
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
        The Meeting Calendar platform offers individuals and enterprises an
        efficient way to schedule meetings. Customers can easily manage their
        appointments by updating or canceling as needed.
      </p>
    </div>
    <div className="col-md-6 my-5" style={{ width: '400px' }}>
      <img
        src={meetingPlannerImage}
        alt="Meeting Planner"
        style={{ width: '40%', height: 'auto' }}
      />
    </div>
  </div>
);

const Services = () => (
  <div className='container-fluid my-5'>
    <div className='mx-5'>
      <h3>Meeting Scheduling Tools</h3>
      <img 
        src={scheduleMeetingImg} 
        alt='Schedule Meeting'
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} 
      />
      <p>This website helps users to plan and organize meetings by finding suitable times for participants.</p>
    </div>
  </div>
);

const Contact = ({ isAuthenticated, handleSignIn, handleSignOut }) => (
  <div className='container my-5 px-3'>
    <h2>Contact Us</h2>
    <p>Feel free to contact us.</p>
    <p>Email: <a href="mailto:john@test.com">john@test.com</a></p>
    <div className='col-md-8 my-5'>
      <img 
        src={MeetingPlanner} 
        alt="Meeting Planner" 
        className="img-fluid" 
      />
    </div>
    <div className='col-md-6 my-5'>
      <h3>Get in Touch</h3>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' className='form-control' placeholder='Enter your name' required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' className='form-control' placeholder='Enter your email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message:</label>
          <textarea id='message' className='form-control' rows='4' placeholder='Write your message' required></textarea>
        </div>
        <button type='submit' className='btn btn-primary mt-3'>Submit</button>
      </form>
      {isAuthenticated ? (
        <button className='btn btn-outline-warning' onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button className='btn btn-outline-success' onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  </div>
);

const PageNotFound = () => (
  <div className='container'>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default MeetingRouters;
