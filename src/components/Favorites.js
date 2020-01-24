import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import unfavorite from '../unfavorite.png'

class Favorites extends React.Component {

  state = {
    favoriteArtworks: [],
    favoritesIDs: [],
  }
  
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.props.id}/favorites`, {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({ 
      favoriteArtworks: data.artworks,
      favoritesIDs: data.favorite_ids,
     }))
  }

  unfavorite = (e) => { 
    let card = e.target.closest('#favorite-card');
    fetch(`http://localhost:3000/api/v1/favorites/${card.dataset.fav}`, {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(this.hideCard(card))
  }
  
  hideCard = (card) => {
    card.style.display = "none"
  }

  showFavorite = (e) => {
    let artID = e.target.closest('#favorite-card').dataset.art;
    this.props.setFavoriteShowID(artID);
    this.props.history.push('/favorite_show')
  }

  render(){
    let renderFavs = this.state.favoriteArtworks.map((fav, index) => {
      let cardID = this.state.favoritesIDs[index]
      let favID = fav.id
     return (
      <Card key={cardID} id="favorite-card" data-fav={cardID} data-art={favID}>
        <Image onClick={this.showFavorite} src={fav.img_url} wrapped ui={false} size="small"/>
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
  return { id }
};

function mdp(dispatch){
  return {
    setFavoriteShowID: (id) => {
      dispatch({
        type: "SET_FAV_SHOW_ID",
        payload: id
      })
    }
  }
}

export default connect(msp, mdp)(Favorites);