import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FcCalendar } from "react-icons/fc";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ isAuthenticated, handleSignIn, handleSignOut }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className='container'>
        <Link className={`navbar-brand ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/">
          <FcCalendar className='mx-2' style={{ width: '30px', height: '30px' }} />
          MeetingApp
        </Link>
        <div className="navbar-collapse collapse justify-content-center">
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className={`nav-link ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/">Home</Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/about">About</Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/services">Services</Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex ms-auto">
          {isAuthenticated ? (
            <button className={`btn btn-outline-danger ${isDarkMode ? 'text-light' : 'text-dark'}`} onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button className={`btn btn-outline-success ${isDarkMode ? 'text-light' : 'text-dark'}`} onClick={handleSignIn}>Sign In</button>
          )}
        </div>
        <div className="ms-3">
          <button className="btn btn-link text-decoration-none d-flex align-items-center" onClick={toggleTheme}>
            {isDarkMode ? (
              <>
                <FaSun style={{ color: '#FFA500', width: '20px', height: '20px' }} />
                <span className="ms-2">Daylight</span>
              </>
            ) : (
              <>
                <FaMoon style={{ color: '#000000', width: '20px', height: '20px' }} />
                <span className="ms-2">Darklight</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
