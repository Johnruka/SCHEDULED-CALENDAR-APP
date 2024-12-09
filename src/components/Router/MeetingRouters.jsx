import React from 'react'
import {BrowserRouter as Router, Link, Route,Routes, useNavigate} from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Dashboard from '../Meeting/Dashboard';
import ScheduleMeeting from '../Meeting/ScheduleMeeting';
import MeetingList from '../Meeting/MeetingList';



const MeetingRouters = () => {
  return (


    <Router>
        <Navbar />
        <ScheduleMeeting/>
        <MeetingList/>
       
        
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/Services' element={<Services />} />
            <Route path='/Contact' element={<Contact/>} />
            <Route path='/dashboard/*' element={<Dashboard />} />
            <Route path='/meetings/*' element={<MeetingList/>} />
            <Route path='/ScheduleMeeting/*' element={<ScheduleMeeting />} />
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
 
     return (<div className='container'>
         <h1>Home Component</h1>
         <div className='btn-group'>
             <button className='btn btn-outline-primary' onClick={() => goToDashboard()}>Navigate To Dashboard</button>
             <button className='btn btn-outline-danger' onClick={() => navigate(-1) }>Back</button>
 
         </div>
     </div>);
 }
 
 
 const About = ()=> {
     return (<div className='container'>About Component</div>);
 }
 
 const Services = ()=> {
    return (<div className='container'>Services Component</div>);

 }

    const Contact = ()=> {
        return (<div className='container'>Contact Component</div>);
    
    }

 const PageNotFound = ()=> {
     return (<div className='container'>PageNotFound Component</div>);
 }
 


 
export default MeetingRouters;