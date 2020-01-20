import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Checkbox, Button } from 'semantic-ui-react';
import { parseSearchDates, fetchArtObjects } from '../helperFunctions';
import { departmentOptions, dateOptions } from '../constants/searchOptions';

class Search extends React.Component {

  componentDidMount(){
    this.props.clearSearchParams()
  }

  handleClick = () => {
    let deptID = this.props.departmentId;
    let dateBegin = this.props.dateBegin;
    let dateEnd = this.props.dateEnd;
    let isHighlight = this.props.isHighlight;
    fetchArtObjects(deptID, dateBegin, dateEnd, isHighlight, 3, this.props.saveArtObjects);
    this.props.changeURL("/art")
  }

  handleDateChange = (e, data) => {
    this.props.handleChange(e, data)
    const parsedDatesArr = parseSearchDates(data.value ? data.value : `8000 - ${new Date().getFullYear()}`);
    this.props.setSearchDates(parsedDatesArr[0], parsedDatesArr[1]);
  }

  render() {
    return (
      <div className="search">
        <h3>Filter Search:</h3>
        <div className="filters">
          <Dropdown onChange={this.props.handleChange} placeholder="Department" name="SET_DEPARTMENT" clearable selection options={departmentOptions} />
          <Dropdown onChange={this.handleDateChange} placeholder="Date / Era" name="SET_DATES" clearable selection options={dateOptions} />
          <div className="reco">
            <Checkbox onChange={this.props.handleCheck} name="SET_HIGHLIGHT" toggle />
            <h4 id="toggle-lbl">Collection Highlight (Recommended)</h4>
          </div>
        </div>
        <Button onClick={this.handleClick} id="art-btn">Show Me Some Art!</Button>
      </div>
    )
  }
}

function msp(state){
  const { departmentId, dates, isHighlight, dateBegin, dateEnd, threeArtObjects } = state.searchReducer;
  return { departmentId, dates, isHighlight, dateBegin, dateEnd, threeArtObjects }
}

function mdp(dispatch){
  return {
    clearSearchParams: () => {
      dispatch({
        type: "CLEAR_SEARCH_PARAMS"
      })
    },
    handleChange: (e, data) => {
      dispatch({
        type: data.name,
        payload: data.value
      })
    },
    handleCheck: (e, data) => {
      dispatch({
        type: data.name,
        payload: data.checked
      })
    },
    setSearchDates: (dateBegin, dateEnd) => {
      dispatch({
        type: "SET_SEARCH_DATES",
        payload: { dateBegin, dateEnd }
      })
    },
    saveArtObjects: (objectsArr) => {
      dispatch({
        type: "SAVE_ART_OBJECTS",
        payload: objectsArr 
      })
    }
  }
}

export default connect(msp, mdp)(Search);