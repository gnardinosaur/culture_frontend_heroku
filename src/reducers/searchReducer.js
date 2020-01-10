const defaultState = {
  departmentId: null,
  dates: "",
  isHighlight: false,
}

function searchReducer(prevState = defaultState, action){
  switch(action.type){  
    case "SET_DEPARTMENT":  
      return {...prevState, departmentId: action.payload}
    case "SET_DATES":  
      return {...prevState, dates: action.payload}
    case "SET_HIGHLIGHT":  
      return {...prevState, isHighlight: action.payload}
    default:
      return prevState
  }
}

export default searchReducer;  