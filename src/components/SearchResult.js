import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Button, Icon, Segment, Header} from 'semantic-ui-react';
import FadeLoader from 'react-spinners/FadeLoader';

class SearchResult extends React.Component {

  state = {
    counter: 0,
    favItem: {},
    favItems: [false, false, false]
  }

  moveArt = (e) => {
    if (e.target.textContent === "Back") {
      this.setState({ counter: this.state.counter - 1 })
    } else { 
      if (this.state.counter === 2) {
        if (this.props.loggedIn) {
          this.props.history.push("/email")  
        } else {
          this.props.savePath(this.props.history.location.pathname)
          this.props.history.push("/login")
        }
      } else {
        this.setState({ counter: this.state.counter + 1 })
      }
    }
  }

  favorite = () => {
    fetch("http://localhost:3000/api/v1/favorites", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ 
        user_id: this.props.id,
        artwork: this.props.threeArtObjects[this.state.counter]
      })
    })
    .then(resp => resp.json())
    .then(favItem => this.setState({ favItem }, () => this.updateFavItemsArr()))
  }

  updateFavItemsArr = () => {
    let updatedArr = [...this.state.favItems];
    updatedArr[this.state.counter] = !updatedArr[this.state.counter];
    this.setState({ 
      ...this.state,
      favItems: updatedArr
     })
  }

  unfavorite = () => {
    fetch(`http://localhost:3000/api/v1/favorites/${this.state.favItem.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(resp => resp.json())
    .then(this.updateFavItemsArr())
  }

  render(){
  
    let favButton = this.state.favItems[this.state.counter] ? 
      <Button id="heart-btn" icon onClick={this.unfavorite} > 
        <Icon name="heart" />
      </Button> 
      : 
      <Button id="heart-btn" icon onClick={this.favorite} disabled={this.props.loggedIn ? false : true}>
        <Icon name="heart outline" />
      </Button>

    let content;

    if(this.props.threeArtObjects.length === 0) {
      content = 
        <div style={{ position: "fixed", top: "30%", left: "50%"}} >
            <FadeLoader color={"#25cc4c"}/>
        </div>
    } else if(this.props.threeArtObjects === 'no results') {
      content = 
        <Segment secondary>
          <Header style={{ color: "red" }} size='large'>Unfortunately there are no results, please try a different set of search parameters.</Header>
          <Header style={{ color: "red" }} size='large'>Bummer.</Header>
          <span role="img" className="sad">😢</span>
        </Segment>
    } else {
      let descriptionArrString = this.props.threeArtObjects[this.state.counter].description
      let desciptionHTML = <div dangerouslySetInnerHTML={{__html: descriptionArrString}} />
      content = 
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} textAlign="left">
              {favButton}
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <Button onClick={this.moveArt} content="Back" icon="left arrow" labelPosition="left" disabled={this.state.counter === 0 ? true : false} />
              <Button onClick={this.moveArt} content="Next" icon="right arrow" labelPosition="right" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Image src={this.props.threeArtObjects[this.state.counter].img} centered rounded />
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment style={{overflow: 'auto', maxHeight: 500 }} textAlign="left">
                <h2>{this.props.threeArtObjects[this.state.counter].title}</h2>
                <h3>{this.props.threeArtObjects[this.state.counter].date}</h3>
                <h4>{this.props.threeArtObjects[this.state.counter].artist ? this.props.threeArtObjects[this.state.counter].artist : this.props.threeArtObjects[this.state.counter].culture}</h4>
                <br />
                {desciptionHTML}
                {/* {this.props.threeArtObjects[this.state.counter].description.map(el => <p>{el}</p>)} */}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    }

    return (
      <div className="search-result">
        {content}
      </div>
    )
  }

};

function msp(state){
  const { threeArtObjects } = state.searchReducer;
  const { loggedIn } = state.userReducer;
  const { id } = state.userReducer.user
  return { threeArtObjects, loggedIn, id }
};

function mdp(dispatch){
  return {
    savePath: (path) => {
      dispatch({
        type: "SAVE_PATH",
        payload: path
      })
    }
  }
};

export default connect(msp, mdp)(SearchResult);

