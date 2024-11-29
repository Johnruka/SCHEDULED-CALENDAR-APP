import React, { useState } from "react";
import './App.css'
import MeetingForm from "./components/Meeting/MeetingForm";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";


const App = () => {
  return (
    
    <>
    <MeetingForm/>
    <Footer/>
    <Navbar/>
    
  </>
);
};

export default App;  