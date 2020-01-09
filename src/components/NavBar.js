import React from 'react';
import logo from '../logo.jpg'

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-container"> 
        <img src={logo} alt="logo" />
        <h3>Sign In / Sign Up</h3>  
      </div>
    </div>
  )
}

export default NavBar;