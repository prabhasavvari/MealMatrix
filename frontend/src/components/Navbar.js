import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () =>{
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50){
        setScrolled(true);
      }else{
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return(
    <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
    <div className="container">
      <div>
        <li className="nav-item"><a className="nav-link" href="#">Get the App</a></li>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#">Add Restaurant</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Sign up</a></li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;