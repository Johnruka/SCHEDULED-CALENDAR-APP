import React from "react";

const Navbar = () => {
  const navLinks = [
    { id: 1, name: "Home", href: "#", alertMessage: "Welcome" },
    {
      id: 2,
      name: "About",
      href: "#",
      alertMessage: "About us!", 
      
    },
    {
      id: 3,
      name: "services",
      href: "#",
      alertMessage: "Explore our services.",
   
    },
    {

  id: 4,
      name: "Contact",
      href: "#",
      alertMessage: "Our contacts.",

    },
    {

  id: 5,
      name: "Demo",
      href: "#",
      alertMessage: "Demo." 
      
      
    },
  ];

  const renderNavLinks = () => {
    return navLinks.map((link) => {
      return (
        <li key={link.id} className="nav-item">
          <a
            className="nav-link"
            href={link.href}
            onClick={() => alert(link.alertMessage)}
          >
            {link.name}
          </a>
        </li>
      );
    });
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
         <img src= "src\\assets\\calendar-icon.png" />   
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{renderNavLinks()}</ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;