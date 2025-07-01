import React from "react";
import "./Navbar.css";
import logo from "../assets/pic.jpg"; // Add your logo to /assets

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Base Badge" className="logo" />
        <h1 className="title">Base Badge</h1>
      </div>
    </nav>
  );
};

export default Navbar;
