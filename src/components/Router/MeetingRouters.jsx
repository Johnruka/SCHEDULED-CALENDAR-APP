import React, { useEffect } from 'react'
import {BrowserRouter as Router, Link, Route,Routes, useNavigate} from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Dashboard from '../Meeting/Dashboard';
import ScheduleMeeting from '../Meeting/ScheduleMeeting';
import MeetingList from '../Meeting/MeetingList';
import Users from '../Meeting/Users';
import InvitationList from '../Meeting/InvitationList';





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
            <Route path='/Invitations' element={<InvitationList />} />
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
 
 
 const About = ()=> {
    return (
    <div className='container-fluid row my-5'>
        <div className='col-md-6 my-5 py-5 mx-1'>
            <h2>Meeting Calendar App</h2>
            <p>Meeting Calendar platform offers Individual/Enterprise for scheduling meeting and customers can manage them through updating and cancelling.</p>
            <p>Our platform was built from the ground up to be a powerful, integrated, and easy-to-use system that leads to better customer experiences and business growth.</p>
        </div>
        <div className='col-md-6 my-5' style={{width: "600px"}}>
            <img src='\src\assets\MeetingPlanner.png' alt="Meeting Planner" style={{width: "600px", height: "300px"}} />
        </div>
    </div>
    ) 
}; 
 
 const Services = ()=> {
    return (
        <div className='container-fluid my-5 mx-5'>
        <h3>Meeting Scheduling Tools</h3>
        <p>This website helps user to plan and organize meetings by finding suitable times for participants.</p>
        <p>Maximum of 5 participants can be added for scheduling meeting.</p>
        <ul style={{width: "600px"}}><h5>Customers can invoke the following Services through this platform:</h5>
            <hr />
            <li><span className='bg-success'>Create</span> meeting</li>
            <hr />
            <li><span className='bg-warning'>Modify</span> meeting</li>
            <hr />
            <li><span className='bg-danger'>Delete</span> meeting</li>
            <hr />
        </ul>
    </div> 
      )
    }  

    const Contact = ()=> {
        return (
            
            <div className='container-fluid my-5 mx-5'>
                <h2>Contact Us</h2>
                <p>Feel free to contact us.</p>
                <p>Email <a href="sarumathijayaraman@gmail.com">john@test.com</a> </p>
            
             <div className='col-md-6 my-5' style={{width: "600px"}}>
             <img src='\src\assets\MeetingPlanner.png' alt="Meeting Planner" style={{width: "600px", height: "300px"}} />
         </div>
         </div>
          

     
          )
        }  

 const PageNotFound = ()=> {
     return (<div className='container'>PageNotFound </div>);
 }
 


 
export default MeetingRouters;
