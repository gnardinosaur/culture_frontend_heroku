import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Image, Segment } from 'semantic-ui-react';

class FavoriteShow extends React.Component {

  state = {
    artObj: {}
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/artworks/${this.props.favoriteShowID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
      })
      .then(resp => resp.json())
      .then(data => this.setState({ artObj: data }))
  }

  render(){
    console.log(this.state.artObj)
    let descriptionArrString = this.state.artObj.description
    let desciptionHTML = <div dangerouslySetInnerHTML={{__html: descriptionArrString}} />

    return (
      <Container>
        <Grid>
            <Grid.Column width={10}>
              <Image src={this.state.artObj.img_url} centered rounded />
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment style={{overflow: 'auto', maxHeight: 500 }} textAlign="left">
                <h2>{this.state.artObj.title}</h2>
                <h3>{this.state.artObj.date}</h3>
                <h4>{this.state.artObj.artist ? this.state.artObj.artist : this.state.artObj.culture}</h4>
                <br />
                {desciptionHTML}
              </Segment>
            </Grid.Column>
        </Grid>
      </Container>
    )
  }
};

function msp(state){
  const { favoriteShowID } = state.favoritesReducer
  return { favoriteShowID }
}

export default connect(msp)(FavoriteShow);