import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';


function Content() {
  return (
    <Switch>
      <Route path="/" render={(routerProps) => <Home {...routerProps} />} />
    </Switch>
  )  
}

export default Content;

