import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Button, Icon, Segment } from 'semantic-ui-react';
import { threeTestObjects } from '../constants/threeTestObjects'

class SearchResult extends React.Component {

  state = {
    counter: 0
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

  render(){
    // replace this code and in Grid.Columns once app is live, this is just a way to have a full array of art objects withough fetching from The Met API 
    let testingObjArr = [];

    if (this.props.threeArtObjects.length === 0) {
      testingObjArr = threeTestObjects
    } else {
      testingObjArr = this.props.threeArtObjects
    }

    return (
      <div className="search-result">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} textAlign="left">
              <Button id="heart-btn" icon>
                <Icon name="heart"/>
              </Button> 
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <Button onClick={this.moveArt} content="Back" icon="left arrow" labelPosition="left" disabled={this.state.counter === 0 ? true : false} />
              <Button onClick={this.moveArt} content="Next" icon="right arrow" labelPosition="right" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Image src={testingObjArr[this.state.counter].img} centered rounded />
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment style={{overflow: 'auto', maxHeight: 500 }} textAlign="left">
                <h2>{testingObjArr[this.state.counter].title}</h2>
                <h3>{testingObjArr[this.state.counter].date}</h3>
                <h4>{testingObjArr[this.state.counter].artist ? testingObjArr[this.state.counter].artist : testingObjArr[this.state.counter].culture}</h4>
                <br />
                {testingObjArr[this.state.counter].description.length > 1 ? testingObjArr[this.state.counter].description.map(el => <p>{el}</p>) : testingObjArr[this.state.counter].description }
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

};

function msp(state){
  const { threeArtObjects } = state.searchReducer;
  const { loggedIn } = state.userReducer
  return { threeArtObjects, loggedIn }
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

