const defaultState = {
  path: "",
  havePathValue: false
};

function searchResultReducer(prevState = defaultState, action){
  switch(action.type){  
    case "SAVE_PATH":  
      return {...prevState, path: action.payload, havePathValue: true}
    case "CLOSE_LOGIN_MODAL":  
      return {...prevState, havePathValue: false }
    default: 
      return prevState
  }
};

export default searchResultReducer;  