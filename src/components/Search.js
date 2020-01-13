import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Checkbox, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { departmentOptions, dateOptions } from '../constants/searchOptions'
import { parseSearchDates } from '../helperFunctions';


function Search(props){

  function handleClick(){
    if (props.dates === "") {
      props.setSearchDates(-8000, new Date().getFullYear())
    } else {
      const parsedDatesArr = parseSearchDates(props.dates)
      props.setSearchDates(parsedDatesArr[0], parsedDatesArr[1])
    }
    props.changeURL("/art")
  }

  return (
    <div className="search">
      <h3>Filter Search:</h3>
      <div className="filters">
        <Dropdown onChange={props.handleChange} placeholder="Department" name="SET_DEPARTMENT" clearable selection options={departmentOptions} />
        <Dropdown onChange={props.handleChange} placeholder="Date / Era" name="SET_DATES" clearable selection options={dateOptions} />
        <div className="reco">
          <Checkbox onChange={props.handleCheck} name="SET_HIGHLIGHT" toggle />
          <h4 id="toggle-lbl">Collection Highlight (Recommended)</h4>
        </div>
      </div>
      <Button onClick={handleClick} id="art-btn">Show Me Some Art!</Button>
    </div>
  )
}

function msp(state){
  const { dates } = state.searchReducer;
  return { dates }
}

function mdp(dispatch){
  return {
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
    }
  }
}

export default connect(msp, mdp)(Search);