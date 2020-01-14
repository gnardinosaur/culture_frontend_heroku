import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchResult from './SearchResult';
import EmailSignUp from './EmailSignUp';


function Content() {
  return (
    <Switch>
      <Route path="/art" component={SearchResult} />
      <Route path="/email" component={EmailSignUp} />
      <Route path="/" component={Home} />
    </Switch>
  )  
}

export default Content;

