import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/shared/Footer';

import './StyleApp.css'
import MeetingRouters from './components/Router/MeetingRouters';


const MeetingApp = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <MeetingRouters />
        <Footer />
      </div>
    </BrowserRouter>

    
  );
};

export default MeetingApp
