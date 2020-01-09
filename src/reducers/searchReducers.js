const defaultState = {
  departmentID: null,
  dates: "",
  isHighlight: false,
}

function reducer(prevState = defaultState, action){
  switch(action.type){  
    case "SET_DEPARTMENT":  
      return {...prevState, department: action.payload}
    default:
      return prevState
  }
}

export default reducer;  