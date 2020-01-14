import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react'
// import { getRandomInclusive } from '../helperFunctions';
// import axios from 'axios';
// import cheerio from 'cheerio';


class SearchResult extends React.Component {

  // state = {
  //   objectIDs: [],
  //   threeWorkObjs: []
  // }

  // componentDidMount(){
  //   let URL;
  //   if (this.props.departmentId !== typeof(Number) && this.props.dates === "" && this.props.isHighlight === false) {
  //     URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=*"
  //   } else {
  //     URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${this.props.departmentId}&dateBegin=${this.props.dateBegin}&dateEnd=${this.props.dateEnd}&isHighlight=${this.props.isHighlight}&q=*`
  //   }
  //   fetch(URL)
  //   .then(resp => resp.json())
  //   .then(data => this.getThreeIDs(data.objectIDs))
  // }

  // getThreeIDs = (objectIDsArr) => {
  //   let objectIDs = [];
  //   let indexNums = [];    
  //   for (let i = 0; i < 3; i++) {
  //     indexNums.push(getRandomInclusive(0, objectIDsArr.length))
  //   }
  //   indexNums.forEach(el => objectIDs.push(objectIDsArr[el]))
  //   this.setState({ objectIDs });
  //   this.buildWorkObjects()
  // }

  // buildWorkObjects = () => {
  //   let threeWorkObjs = [];
  //   this.state.objectIDs.forEach(el => {
  //     fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`)
  //     .then(resp => resp.json())
  //     .then(art => { 
  //       let oneWork = {
  //         ID: art.objectID,
  //         img: art.primaryImage,
  //         department: art.department,
  //         title: art.title,
  //         culture: art.culture,
  //         artist: art.artistDisplayName,
  //         date: art.objectDate
  //       };
  //       threeWorkObjs.push(oneWork);
  //       this.setState({ threeWorkObjs }, () => {
  //         if (this.state.threeWorkObjs.length === 3) {
  //           this.addDescriptions();
  //         }
  //       })
  //     })
  //   })
  // }

  // addDescriptions = () => {
  //   let artObjectsWithDescriptions = [];
  //   this.state.threeWorkObjs.forEach(el => {
  //     axios.get(`https://www.metmuseum.org/art/collection/search/${el.ID}`)
  //     .then((resp) => {
  //       let html = resp.data;
  //       let $ = cheerio.load(html);
  //       let textNodes;
  //       let itemDescriptionArr = [];
  //       $('.artwork__intro__desc').each(function(){ 
  //         textNodes = $(this).find('p').contents(); 
  //         for (let i = 0; i < textNodes.length; i++) {
  //           if (textNodes[i].type === "text") {
  //             itemDescriptionArr.push(textNodes[i].data)
  //           }
  //           el.description = itemDescriptionArr;
  //         }
  //         artObjectsWithDescriptions.push(el);
  //       })
  //       this.setState({ threeWorkObjs: artObjectsWithDescriptions })
  //     })
  //   })
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
              blah blah blah
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
  //need this? 
  }
};

export default connect(msp, mdp)(SearchResult);

