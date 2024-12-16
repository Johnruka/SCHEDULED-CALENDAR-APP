import React from 'react';
import Footer from './components/shared/Footer';
import './StyleApp.css';
import MeetingRouter from './components/Router/MeetingRouters'




const MeetingApp = () => {
  return (
     <>
     <MeetingRouter/>
     <Footer/>
     </>
    
  );
};

export default MeetingApp
