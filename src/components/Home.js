import React from 'react';
import Search from './Search'

function Home(props) {
  return (
    <div className="home">
      <h1>Culture.</h1>
      <hr/>
      <h3>Access 230,000+ objects from The Met's collection to expand your mind.</h3>
      <Search changeURL={props.history.push}/>
    </div>
  )
}

export default Home;