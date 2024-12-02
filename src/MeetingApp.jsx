import React from 'react';
import Navbar from './components/shared/Navbar'
import Meeting from './components/shared/MainMeeting';
import Footer from './components/shared/Footer'
import './StyleApp.css'



const MeetingApp = () => {
  return (
    <div>
     <Navbar/>
     <Meeting/>
     <Footer/>
    </div>
  );
};

export default MeetingApp
