import React from 'react';
import './StyleApp.css'
import Footer from './components/shared/Footer';
import MeetingRouters from './components/Router/MeetingRouters';




const MeetingApp = () => {
  return (
     <>
     <MeetingRouters/>
     <Footer/>
     </>
    
  );
};

export default MeetingApp
