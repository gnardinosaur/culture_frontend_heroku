import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import unfavorite from '../unfavorite.png'

class Favorites extends React.Component {

  state = {
    favorites: []
  }
  
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
    .then(favorites => this.setState({ favorites }))
  }

  render(){
    
    let renderFavs = this.state.favorites.map(fav => {
     return (
      <Card>
        <Image src={fav.img_url} wrapped ui={false} size="small"/>
        <Card.Content>
          <Card.Header>{fav.title}</Card.Header>
          {/* <Card.Meta>Joined in 2016</Card.Meta> */}
          {/* <Card.Description>
            Daniel is a comedian living in Nashville.
          </Card.Description> */}
        </Card.Content>
        <Card.Content id="unfav" extra>
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