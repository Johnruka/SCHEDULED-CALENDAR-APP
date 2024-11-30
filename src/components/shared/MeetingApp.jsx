import React from 'react';
import Navbar from '../shared/Navbar'
import Meeting from '../shared/MainMeeting';
import Footer from '../shared/Footer'

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
