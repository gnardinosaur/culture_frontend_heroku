import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import NavBar from './components/NavBar';
import Content from './components/Content';

function App(props) {

  useEffect(() => {
    const token = localStorage.token

    if(token){
      fetch('http://localhost:3000/api/v1/auto_login', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors){
          alert(data.errors)
        } else {
          localStorage.token = token
          props.setUser(data)
        }
      })
    }
  });

  return (
    <div className="app">
      <NavBar changeURL={props.history.push} />
      <Content />
    </div>
  );
};

function mdp(dispatch){
  return {
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      }) 
    } 
  }
}

export default connect(null, mdp)(App);
