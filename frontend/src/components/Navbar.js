import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import AuthModal from "./Modal/AuthModal";

const Navbar = () =>{
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

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
    <>
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
              <li className="nav-item"><a className="nav-link" style={{cursor: "pointer"}} >Add Restaurant</a></li>
              <li className="nav-item"><a className="nav-link" style={{cursor: "pointer"}}  onClick={() => { setIsSignup(false); setShowAuthModal(true); }}>Login</a></li>
              <li className="nav-item"><a className="nav-link" style={{cursor: "pointer"}}  onClick={() => { setIsSignup(true); setShowAuthModal(true); }}>Sign up</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} isSignup={isSignup} />
    </>
  );
};

export default Navbar;