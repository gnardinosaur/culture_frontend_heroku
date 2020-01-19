import axios from 'axios';
import cheerio from 'cheerio';

export function parseSearchDates(dateString){
  let dateArr = dateString.split("-");
  dateArr = dateArr.map(el => el.trim())
  let B = RegExp(/B/);
  let A = RegExp(/A/);
  let dateBegin;
  let dateEnd;
  
  dateArr.forEach((el, index) => {
    if (B.exec(el)){
      if (index === 0) {
        dateBegin = "-" + el.replace(/\D/g, "")
      } else {
        dateEnd = "-" + el.replace(/\D/g, "")
      }
    } else if (A.exec(el)){
      if (index === 0){
        dateBegin = el.replace(/\D/g, "")
      } else {
        dateEnd = el.replace(/\D/g, "")
      }
    } else if (el === "Present") {
      if (index === 0){
        dateBegin = new Date().getFullYear()
      } else {
        dateEnd = new Date().getFullYear()
      }
    } else if (el !== "Present" && index === 0) {
      dateBegin = "-" + el.replace(/\D/g, "")
    } else {
      dateEnd = el.replace(/\D/g, "")
    }
  })

  return [dateBegin, dateEnd]

};

function getRandomInclusive(min, max){
  return Math.floor(Math.random() * (max - min + 1 )) + min
}


export function fetchArtObjects(deptID, dateBegin, dateEnd, isHighlight, num, cb){
  
  let URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${deptID}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&isHighlight=${isHighlight}&q=*`
  fetch(URL)
  .then(resp => resp.json())
  .then(data => getArtObjIDs(data.objectIDs, num, cb))
}

function getArtObjIDs(allObjectIDsArr, num, cb){
  let objectIDs = [];
  let indexNums = [];    
  for (let i = 0; i < num; i++) {
    indexNums.push(getRandomInclusive(0, allObjectIDsArr.length))
  } 
  indexNums.forEach(el => objectIDs.push(allObjectIDsArr[el]));
  buildWorkObjects(objectIDs, num, cb);
}

function buildWorkObjects(objectIDs, num, cb){
  let artObjs = [];

  objectIDs.forEach(el => {
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
      artObjs.push(oneWork);
      if (artObjs.length === num) {
        addDescriptions(artObjs, num, cb);
      }
    })
  })
}

function addDescriptions(artObjs, num, cb){
  let artObjectsWithDescriptions = [];
  artObjs.forEach(el => {
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
      if (artObjectsWithDescriptions.length === num) {
        cb(artObjectsWithDescriptions)
      }    
    })
  })
}

