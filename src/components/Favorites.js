import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import unfavorite from '../unfavorite.png'

class Favorites extends React.Component {

  state = {
    favoriteArtworks: []
  }
  
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.props.id}/favorites`, {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.jwt}`
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({ 
      favoriteArtworks: data.artworks,
      favoritesIDs: data.favorite_ids,
     }))
  }

  unfavorite = (e) => {  
    fetch(`http://localhost:3000/api/v1/favorites/${e.target.parentNode.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.jwt}`
      }
    })
    .then(this.hideCard(e.target.parentNode))
  }

  hideCard = (node) => {
    node.style.display = "none"
  }

  render(){
    let renderFavs = this.state.favoriteArtworks.map((fav, index) => {
      let cardID = this.state.favoritesIDs[index]
     return (
      <Card key={cardID} id={cardID} >
        <Image src={fav.img_url} wrapped ui={false} size="small"/>
        <Card.Content>
          <Card.Header>{fav.title}</Card.Header>
        </Card.Content>
        <Card.Content onClick={this.unfavorite} id="unfav" extra>
          <Image src={unfavorite} size="mini" />      
        </Card.Content>
      </Card>
     )
    })
    
    return (
      <div className="favs">
        <h2>Favorites -</h2>
        <hr />
        <Card.Group centered>
          {renderFavs}
        </Card.Group>
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