const defaultState = {
  user: {
    id: "",
    username: "",
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
  },
  loggedIn: false
};

function userReducer(prevState = defaultState, action){
  switch(action.type){  
    case "SET_USER":  
      return {
        ...prevState, 
        user: action.payload, 
        loggedIn: true, 
      }
    case "LOG_OUT":  
      return {...prevState, user: {}, loggedIn: false}
    default:
      return prevState
  }
};

export default userReducer;