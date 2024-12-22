import React from 'react';
import Footer from './components/shared/Footer';
import './StyleApp.css';

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
