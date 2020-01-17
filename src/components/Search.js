import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Checkbox, Button } from 'semantic-ui-react';
import { parseSearchDates } from '../helperFunctions';
import { departmentOptions, dateOptions } from '../constants/searchOptions'
import { getRandomInclusive } from '../helperFunctions';
import axios from 'axios';
import cheerio from 'cheerio';


class Search extends React.Component {

  state = {
    objectIDs: [],
    threeWorkObjs: []
  }

  handleClick = () => {
    this.fetchArtObjects()
  }

  handleDateChange = (e, data) => {
    this.props.handleChange(e, data)
    const parsedDatesArr = parseSearchDates(data.value);
    this.props.setSearchDates(parsedDatesArr[0], parsedDatesArr[1]);
  }

  fetchArtObjects = () => {
    let URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${this.props.departmentId}&dateBegin=${this.props.dateBegin}&dateEnd=${this.props.dateEnd}&isHighlight=${this.props.isHighlight}&q=*`
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
    let threeWorkObjs = [];
    this.state.objectIDs.forEach(el => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`)
      .then(resp => resp.json())
      .then(art => { 
        let oneWork = {
          ID: art.objectID,
          img: art.primaryImage,
          department: art.department,
          title: art.title,
          culture: art.culture,
          artist: art.artistDisplayName,
          date: art.objectDate
        };
        threeWorkObjs.push(oneWork);
        this.setState({ threeWorkObjs }, () => {
          if (this.state.threeWorkObjs.length === 3) {
            this.addDescriptions();
          }
        })
      })
    })
  }

  addDescriptions = () => {
    let artObjectsWithDescriptions = [];
    this.state.threeWorkObjs.forEach(el => {
      axios.get(`https://www.metmuseum.org/art/collection/search/${el.ID}`)
      .then((resp) => {
        let html = resp.data;
        let $ = cheerio.load(html);
        let textNodes;
        let itemDescriptionArr = [];
        $('.artwork__intro__desc').each(function(){ 
          textNodes = $(this).find('p').contents(); 
          for (let i = 0; i < textNodes.length; i++) {
            if (textNodes[i].type === "text") {
              itemDescriptionArr.push(textNodes[i].data)
            }
            el.description = itemDescriptionArr;
          }
          artObjectsWithDescriptions.push(el);
        })
        this.props.saveArtObjects(artObjectsWithDescriptions);
        this.props.changeURL("/art")
      })
    })
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