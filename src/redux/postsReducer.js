import {API} from "../api/api";
import * as axios from "axios";

const SET_USER_POSTS = 'SET_USER_POSTS';
const ADD_NEW_POST = 'ADD_NEW_POST';
const ADD_EDIT_POST = 'ADD_EDIT_POST';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  posts: [
    {
      userId: 10,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
  ]
}
const postsReducer = (state = initialState,action) => {

switch (action.type) {
  case SET_USER_POSTS: 
    return {...state, posts: action.UserPosts}

  case ADD_NEW_POST: 
    const changedPosts = [...state.posts];
  const pushPost = changedPosts.push(action.newPostData);
  return{
    ...state,
    posts: changedPosts
  }

  case ADD_EDIT_POST: 
  const position = 9 - (action.editData.userId*10 - action.editData.id);
  let allPosts = [...state.posts];
  let bbb = allPosts.splice(position, 1, action.editData)
  
   return{
    ...state,
    posts: allPosts
  }
  case DELETE_POST: 
  const position2 = 9 - (action.delPostData.userId*10 - action.delPostData.id);
  let allPosts2 = [...state.posts];
  let bbb2 = allPosts2.splice(position2, 1)
  
   return{
    ...state,
    posts: allPosts2
  }
  
default:
  return state;

}
}

//AC
export const setUserPosts = (UserPosts) => ({type: SET_USER_POSTS, UserPosts})
export const addNewPostAC = (newPostData) => ({type: ADD_NEW_POST, newPostData})
export const addEditPostAC = (editData) => ({type: ADD_EDIT_POST, editData})
export const delPostFromPosts = (delPostData) => ({type: DELETE_POST, delPostData})
//Санки
export const requestUserPosts = (userId) => {
  return async (dispatch) => {
      let data = await API.getPosts(userId);
      dispatch(setUserPosts(data));
  }
}
export const addNewPost = (newPostData) => {
  return async (dispatch) => {
      let data = await API.postNewPost(newPostData);
      dispatch(addNewPostAC(data));
      
  }
}

export default postsReducer;