import React from 'react';
import Search from './Search'

function Home(props) {
  return (
    <div className="home">
      <h1>Culture.</h1>
      <hr/>
      <h3>Learn about 230,000+ works of art to expand your mind.</h3>
      <Search changeURL={props.history.push}/>
    </div>
  )
}

export default Home;