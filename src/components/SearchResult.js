import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react'
import { getRandomInclusive } from '../helperFunctions';
import axios from 'axios';
import cheerio from 'cheerio';


class SearchResult extends React.Component {

  state = {
    objectIDs: [],
    workObjs: []
  }

  componentDidMount(){
      
    let URL;

    if (this.props.departmentId !== typeof(Number) && this.props.dates === "" && this.props.isHighlight === false) {
      URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=*"
    } else {
      URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${this.props.departmentId}&dateBegin=${this.props.dateBegin}&dateEnd=${this.props.dateEnd}&isHighlight=${this.props.isHighlight}&q=*`
    }

    fetch(URL)
    .then(resp => resp.json())
    .then(data => this.getThreeIDs(data.objectIDs))
  }

  getThreeIDs = (objectIDsArr) => {
    let objectIDs = [];
    let indexNums = [];    
    
    for (let i = 0; i < 3; i++) {
      indexNums.push(getRandomInclusive(0, objectIDsArr.length))
    }
    
    indexNums.forEach(el => objectIDs.push(objectIDsArr[el]))

    this.setState({ objectIDs });
    this.buildWorkObjects()
  }

  buildWorkObjects = () => {
    this.state.objectIDs.forEach(el => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`)
      .then(resp => resp.json())
      .then(art => this.setState({ workObjs:  [...this.state.workObjs, art]}, function() { console.log(this.state.workObjs) })
      ) 
    })
  }

  // getDescriptions = () => {
  //   debugger;
  //   console.log("get descriptions")
  // }

  render(){
    return (
      <div className="search-result">
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={10}>
              {/* pass in arwork image*/}
              <Image src="https://bit.ly/36RfwFI" />
            </Grid.Column>
            <Grid.Column width={6}>
              {/* pass in arwork deets & description */}
              Blah Blah Blah
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

};

function msp(state){
  const { departmentId, dates, isHighlight, dateBegin, dateEnd } = state.searchReducer;
  return { departmentId, dates, isHighlight, dateBegin, dateEnd }
};

function mdp(dispatch){
  return {
  //need this? 
  }
};

export default connect(msp, mdp)(SearchResult);

