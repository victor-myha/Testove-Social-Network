import {API} from "../api/api";

const SET_USERS = 'SET_USERS';

let initialState = {
  users: [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
      lat: "-37.3159",
      lng: "81.1496"
      }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
      }
      }
  ]
}
const usersReducer = (state = initialState,action) => {

switch (action.type) {
  case SET_USERS: {
    return {...state, users: action.users}
}

default:
  return state;
}
}


//AC
export const setUsers = (users) => ({type: SET_USERS, users})
//Санки
export const requestUsers = () => {
  return async (dispatch) => {
      let data = await API.getUsers();
      dispatch(setUsers(data));
  }
}
export default usersReducer;