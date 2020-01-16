import React from 'react';
import { connect } from 'react-redux';
import logo from '../logo.jpg';
import { List } from 'semantic-ui-react';


function NavBar(props) {
  
  function linksRender(){
    if (props.loggedIn) {
      return (
        <List horizontal>
          <List.Item id="nav-link">Favorites |</List.Item>
          <List.Item id="nav-link">Scheduled Emails |</List.Item>
          <List.Item onClick={() => props.logOut()} id="nav-link">Log Out</List.Item>
        </List>
      )
    } else {
      return <h3 id="nav-link" onClick={() => props.changeURL("/login")}>Sign In / Sign Up</h3>  
    }
  };

  return (
    <div className="nav-bar">
      <div className="nav-container"> 
        <img onClick={() => props.changeURL("/")} src={logo} alt="logo" />
        {linksRender()}
      </div>
    </div>
  )
};

function msp(state){
  const { loggedIn } = state.userReducer
  return { loggedIn }
};

function mdp(dispatch){
  return {
    logOut: () => {
      dispatch({
        type: "LOG_OUT"
      })
    }
  }
}

export default connect(msp, mdp)(NavBar);