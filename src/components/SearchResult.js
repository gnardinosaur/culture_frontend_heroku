import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react'

class SearchResult extends React.Component {

  render(){
    return (
      <div className="search-result">
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={10}>
              {/* pass in arwork image*/}
              {/* <Image src="https://bit.ly/36RfwFI" /> */}
              <Image src={this.props.threeArtObjects[0].img} />
            </Grid.Column>
            <Grid.Column width={6}>
              {/* pass in arwork deets & description */}
              {/* blah blah blah */}
              <h2>{this.props.threeArtObjects[0].title}</h2>
              <h4>{this.props.threeArtObjects[0].description}</h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

};

function msp(state){
  const { threeArtObjects } = state.searchReducer;
  return { threeArtObjects }
};

function mdp(dispatch){
  return {
  //do I need mdp in this component? 
  }
};

export default connect(msp, mdp)(SearchResult);

