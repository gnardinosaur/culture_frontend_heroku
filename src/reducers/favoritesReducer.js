const defaultState = {
  favoriteShowID: ""
}

function favoritesReducer(prevState = defaultState, action){
  switch(action.type){  
    case "SET_FAV_SHOW_ID":
      return { favoriteShowID: action.payload }
    default:
      return prevState
  }
}

export default favoritesReducer;  