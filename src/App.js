import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import NavBar from './components/NavBar';
import Content from './components/Content';

function App(props) {
  return (
    <div className="app">
      <NavBar changeURL={props.history.push} />
      <Content />
    </div>
  );
}

export default App;
