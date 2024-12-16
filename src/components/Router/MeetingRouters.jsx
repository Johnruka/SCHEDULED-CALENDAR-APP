import React, { useEffect } from 'react'
import {BrowserRouter as Router, Link, Route,Routes, useNavigate} from 'react-router-dom';
import Navbar from '../shared/Navbar';
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
    
    useEffect(()=> {
        window.location.href = "https://leaddesk.com/leadapps-store/product/conference-call/";
    }, [])
    return null;
 }
 
 const Services = ()=> {
    useEffect(()=> {
        window.location.href = "https://leaddesk.com/leadapps-store/product/meeting-calendar/";
    }, [])
    return null;   

 }

    const Contact = ()=> {
        useEffect(()=> {
            window.location.href = "https://leaddesk.com/leadapps-store/product/new-contacts-imported-report/";
        }, [])
        return null;  
    
    }

 const PageNotFound = ()=> {
     return (<div className='container'>PageNotFound </div>);
 }
 


 
export default MeetingRouters;
