import React from 'react';
import { connect } from 'react-redux';
import logo from '../logo.jpg';
import { List } from 'semantic-ui-react';


function NavBar(props) {

  function removeLocalStorageToken(){
    localStorage.removeItem('token');
    props.logOut()
    props.changeURL("/")
  }
  
  function linksRender(){
    if (props.loggedIn) {
      return (
        <List horizontal>
          <List.Item onClick={() => props.changeURL("/favorites")} id="nav-link">Favorites |</List.Item>
          <List.Item onClick={() => props.changeURL("/scheduled_emails")} id="nav-link">Scheduled Emails |</List.Item>
          <List.Item onClick={() => props.changeURL("/profile")} id="nav-link">Profile |</List.Item>
          <List.Item onClick={() => removeLocalStorageToken()} id="nav-link">Log Out</List.Item>
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