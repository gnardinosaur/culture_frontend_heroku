import React from 'react';
import { connect } from 'react-redux';

class SearchResult extends React.Component {
  
  componentDidMount(){
    let test = this.props.dates;
    let testArr = test.split("-");
    let B = RegExp(/B/);
    let A = RegExp(/A/);
    let execArr = [];
    let dateBegin;
    let dateEnd;
    
    testArr.forEach((el, index) => {
      if (B.exec(el)){
        execArr = B.exec(el);
        if (index === 0) {
          dateBegin = el
        } else {
          dateEnd = el
        }
      } else if (A.exec(el)){
        execArr = A.exec(el);
        if (index === 0){
          dateBegin = el
        } else {
          dateEnd = el
        }
      } else if (el === " Present") {
        if (index === 0){
          dateBegin = el
        } else {
          dateEnd = el
        }
      }
    })
    debugger;
    // fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&departmentId=${props.departmentId}&dateBegin=${}&dateEnd=${}&isHighlight`)
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
  
  const { departmentId, dates, isHighlight } = state.searchReducer;
  
  return {
    departmentId: departmentId,
    dates: dates,
    isHighlight: isHighlight
  }
};

export default connect(msp)(SearchResult);