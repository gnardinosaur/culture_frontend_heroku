import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Checkbox, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { departmentOptions, dateOptions } from '../constants/searchOptions'

function Search(props){

  function handleClick(){
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
    }
  }
}

export default connect(null, mdp)(Search);