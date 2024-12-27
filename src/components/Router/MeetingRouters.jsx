import React, { useEffect } from 'react'
import {BrowserRouter as Router, Link, Route,Routes, useNavigate} from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Dashboard from '../Meeting/Dashboard';
import ScheduleMeeting from '../Meeting/ScheduleMeeting';
import MeetingList from '../Meeting/MeetingList';
import Users from '../Meeting/Users';
import InvitationList from '../Meeting/InvitationList';
import Settings from '../Meeting/Settings'
import Analytics from '../Meeting/Analytics';
import MeetingPlanner from '../../assets/MeetingPlanner.jpeg';
import scheduleMeetingImg from '../../assets/ScheduleMeeting.png';
import meetingPlannerImage from '../../assets/meetingPlannerImage.jpeg'; 


const MeetingRouters = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/Services' element={<Services />} />
            <Route path='/Contact' element={<Contact/>} />
            <Route path='/dashboard/*' element={<Dashboard />} />
            <Route path='/meetings/*' element={<MeetingList/>} />
            <Route path='/ScheduleMeeting/*' element={<ScheduleMeeting />} />
            <Route path='/Users/*' element={<Users />} />
            <Route path='/Invitations/*' element={<InvitationList />} />
            <Route path='/Settings/*' element={<Settings />} />
            <Route path='/Analytics/*' element={<Analytics />} />
            <Route path='*' element={<PageNotFound />} /> 
        </Routes>
    </Router>
  )
}
const Home = ()=> {

    const navigate = useNavigate();
 
     const goToDashboard = () => {
         console.log('navigate to dashboard component');
         navigate('/dashboard');
     }
 
     return(<div className='container'>
         <h1>Home Component</h1>
         <div className='btn-group'>
             <button className='btn btn-outline-primary' onClick={() => goToDashboard()}>Navigate To Dashboard</button>
             <button className='btn btn-outline-danger' onClick={() => navigate(-1) }>Back</button>
 
         </div>
     </div>);
 }
 
 const About = () => {
  return (
      <div className="container-fluid row my-5">
          <div className="col-md-6 my-5 py-5">
              <h2>Meeting Calendar App</h2>
              <p>
                  The Meeting Calendar platform offers individuals and enterprises an
                  efficient way to schedule meetings. Customers can easily manage their
                  appointments by updating or canceling as needed.
              </p>
              <p>
                  Our system is designed from the ground up to be powerful, integrated,
                  and easy to use, leading to improved customer experiences and business
                  growth.
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
};

 
const Services = () => {
  return (
    <div className='container-fluid my-5'>
      <div className='mx-5'>
        <h3>Meeting Scheduling Tools</h3>
        <img 
          src={scheduleMeetingImg} 
          alt='Schedule Meeting'
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} 
        />
        <p>This website helps users to plan and organize meetings by finding suitable times for participants.</p>
        <p>A maximum of 25 participants can be added for scheduling a meeting.</p>
        <div style={{ maxWidth: "600px" }}>
          <h5>Customers can invoke the following Services through this platform:</h5>
          <hr />
          <ul className='list-unstyled'>
            <li>
              <span className='badge bg-success'>Create</span> meeting
              <hr />
            </li>
            <li>
              <span className='badge bg-warning'>Modify</span> meeting
              <hr />
            </li>
            <li>
              <span className='badge bg-danger'>Delete</span> meeting
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

  

    const Contact = ()=> {
        return (
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
            </div>
        </div>
  

     
          )
        }  

 const PageNotFound = ()=> {
     return (<div className='container'>PageNotFound </div>);
 }
 


 
export default MeetingRouters;
