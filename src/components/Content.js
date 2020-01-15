import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchResult from './SearchResult';
import EmailSignUp from './EmailSignUp';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';


function Content() {
  return (
    <Switch>
      <Route path="/art" component={SearchResult} />
      <Route path="/email" component={EmailSignUp} />
      <Route path="/login" component={Login} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/" component={Home} />
    </Switch>
  )  
}

export default Content;

