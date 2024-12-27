import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FcCalendar } from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault(); 
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = (e) => {
    e.preventDefault(); 
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <FcCalendar
        className='mx-2'
        style={{ width: '30px', height: '30px' }}
      />
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
        <div className="ms-auto mx-2 text-light dropdown">
          <span className='px-1'><FaCircleUser /></span>
          <button
            className='btn btn-dark px-1 dropdown-toggle'
            type="button"
            data-bs-toggle="dropdown"
            id="dropdownMenuButton"
            aria-expanded="false"
          >
            {isAuthenticated ? "Signin" : "Signout"}
          </button>
          <ul className="dropdown-menu text-primary" aria-labelledby="dropdownMenuButton">
            {isAuthenticated ? (
              <li><a className="dropdown-item" href="#" onClick={handleLogout}>Signout</a></li>
            ) : (
              <li><a className="dropdown-item" href="#" onClick={handleLogin}>Signin</a></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;