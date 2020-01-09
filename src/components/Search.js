import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Checkbox, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { departmentOptions, dateOptions } from '../constants/searchOptions'

function Search(props){

  return (
    <div className="search">
      <h3>Filter Search:</h3>
      <div className="filters">
        <Dropdown onChange={props.setDepartment} placeholder="Department" clearable selection options={departmentOptions} />
        <Dropdown placeholder="Date / Era" clearable selection options={dateOptions} />
        <div className="reco">
          <Checkbox toggle />
          <h4 id="toggle-lbl">Collection Highlight (Recommended)</h4>
        </div>
      </div>
      <Button id="art-btn">Show Me Some Art!</Button>
    </div>
  )
}

function mdp(dispatch){
  return {
    setDepartment: (e, data) => {
      dispatch({
        type: "SET_DEPARTMENT",
        payload: data.value
      })
    }
  }
}

export default connect(
  null,
  mdp
)(Search);