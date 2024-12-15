import React from "react";
import { Link } from 'react-router-dom'
import { FcCalendar } from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
       <FcCalendar className='mx-2' 
       style={{width: '30px', height: '30px'}}/>
        <div className='container'>
           <ul className='navbar-nav'>
            <li className='nav-item'>
                <Link className='nav-link' to="/" >Home</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to="/about" >About</Link>
                
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to="/services" >services</Link>
            </li>
            <li className='nav-item'>
            <Link className='nav-link' to="/contact" >Contact</Link>
            </li>
           </ul>
           <div className="ms-auto mx-2 text-light dropdown">
                <span className='px-1'><FaCircleUser /></span>
                <button className='btn btn-dark px-1 dropdown-toggle' type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" aria-expanded="false">Demo</button>
                <ul className="dropdown-menu text-primary" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#">Signout</a></li>
                </ul>
        </div>
        </div>
    </div>
  );
};

export default Navbar;