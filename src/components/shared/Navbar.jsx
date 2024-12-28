import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FcCalendar } from "react-icons/fc";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Add additional logic here if needed for global state or applying classes to your app container for themes
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <FcCalendar className='mx-2' style={{ width: '30px', height: '30px' }} />
      <div className='container'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to="/">Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="/about">About</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="/services">Services</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="ms-auto mx-2">
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