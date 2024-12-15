import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    
    <div className={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "250px",
          background: "#f8f9fa",
          padding: "16px",
          borderRight: "1px solid #ddd ",
        }}
      >
        <h3>Dashboard</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button className="btn btn-outline-primary w-100 mb-2">
                Meeting Calendar
              </button>
            </li>
    
  >
    <Routes>
    <Route path="About" element={<About />} />
    {/* add more routers as needed :) */}
  </Routes>
  </div>
  );
};


export default About
