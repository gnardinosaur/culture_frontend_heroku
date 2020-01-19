import React from 'react';
import { connect } from 'react-redux';

class Favorites extends React.Component {
  
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/user/${this.props.id}/favorites`, {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.jwt}`
      }
    })
    .then(resp => resp.json())
    .then(console.log)
    //map through the returned array of favorites, add as flex grid on page with img and title and unfav btn, when clicked the "card" goes to the searchResult component of the piece of art 
  }

  render(){
    return (
      <div>
        favorites page
      </div>
    )
  }
};

function msp(state){
  const { id } = state.userReducer.user;
  const { jwt } = state.userReducer
  return { id, jwt }
}

export default connect(msp)(Favorites);