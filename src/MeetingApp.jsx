import React from 'react';
import Footer from './components/shared/Footer';
import MeetingRouters from './components/Router/MeetingRouters'
import './StyleApp.css'


const MeetingApp = () => {
  return (
     <>
     <MeetingRouters/>
     <Footer/>
     </>
    
  );
};

export default MeetingApp
