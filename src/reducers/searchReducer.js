const defaultState = {
  departmentId: "*",
  dates: "",
  isHighlight: false,
  dateBegin: -8000,
  dateEnd: new Date().getFullYear()
}

function searchReducer(prevState = defaultState, action){
  switch(action.type){  
    case "SET_DEPARTMENT":  
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
    default:
      return prevState
  }
}

export default searchReducer;  