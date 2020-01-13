import React from 'react';
import { connect } from 'react-redux';

class SearchResult extends React.Component {

  componentDidMount(){
      
    let URL;

    if (this.props.departmentId !== typeof(Number) && this.props.dates === "" && this.props.isHighlight === false) {
      URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=*"
    } else {
      URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${this.props.departmentId}&dateBegin=${this.props.dateBegin}&dateEnd=${this.props.dateEnd}&isHighlight=${this.props.isHighlight}&q=*`
    } 

    console.log("URL", URL)

    fetch(URL)
    .then(resp => resp.json())
    .then(data => console.log(data.total))
  }

  render(){
    return (
      <div>
        search results art.
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

