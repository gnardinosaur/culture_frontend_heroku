import React from 'react';
import logo from '../logo.jpg'

function NavBar(props) {
  return (
    <div className="nav-bar">
      <div className="nav-container"> 
        <img onClick={() => props.changeURL("/")} src={logo} alt="logo" />
        <h3 onClick={() => props.changeURL("/login")}>Sign In / Sign Up</h3>  
      </div>
    </div>
  )
}

export default NavBar;