const defaultState = {
  departmentId: "*",
  dates: "",
  isHighlight: false,
  dateBegin: -8000,
  dateEnd: new Date().getFullYear(),
  threeArtObjects: []
}

function searchReducer(prevState = defaultState, action){
  switch(action.type){  
    case "CLEAR_SEARCH_PARAMS":
      return { 
        departmentId: "*",
        dates: "",
        isHighlight: false,
        dateBegin: -8000,
        dateEnd: new Date().getFullYear(),
        threeArtObjects: [] 
      }
    case "CLEAR_ART_OBJECTS":
      return {...prevState, threeArtObjects: {} }
    case "SET_DEPARTMENT":  
      if (action.payload === "") {
        action.payload = "*"
      }
      return {...prevState, departmentId: action.payload}
    case "SET_DATES":  
      return {...prevState, dates: action.payload}
    case "SET_HIGHLIGHT":  
      return {...prevState, isHighlight: action.payload}
    case "SET_SEARCH_DATES":
      return {
        ...prevState, 
        dateBegin: parseInt(action.payload.dateBegin),
        dateEnd: parseInt(action.payload.dateEnd)
      }
    case "SAVE_ART_OBJECTS":
      return {...prevState, threeArtObjects: action.payload }
    default:
      return prevState
  }
}

export default searchReducer;  