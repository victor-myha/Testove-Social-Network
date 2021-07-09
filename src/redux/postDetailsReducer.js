import {API} from "../api/api";
import {addEditPostAC,delPostFromPosts} from './postsReducer';

const SET_POST_DETAILS = 'SET_POST_DETAILS';
const SET_POST_ITEM_INFO = 'SET_POST_ITEM_INFO';
const SET_EDIT_POST = 'SET_EDIT_POST';
const DEL_POST = 'DEL_POST';


let initialState = {
  postDetails: [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }
  ],
  postItemInfo:[
    {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
  ]
}
const postDetailsReducer = (state = initialState,action) => {

switch (action.type) {
  case SET_POST_DETAILS: 
    return {...state, postDetails: action.postDetailsData}

  case SET_POST_ITEM_INFO: 
  return{
    ...state,
    postItemInfo: [action.postItemInfo]
  }
  case SET_EDIT_POST: 
  return{
    ...state,
    postItemInfo: [action.editPostData]
  }
  case DEL_POST: 
  return{
    ...state,
    postItemInfo: []
  }


default:
  return state;
}
}


//AC
export const setPostDetails = (postDetailsData) => ({type: SET_POST_DETAILS, postDetailsData})
export const setPostItemInfo = (postItemInfo) => ({type: SET_POST_ITEM_INFO, postItemInfo})
export const setEditPost = (editPostData) => ({type: SET_EDIT_POST, editPostData})
export const delPostAC = () => ({type: DEL_POST})
//Санки
export const requestPostDetails = (postId) => {
  return async (dispatch) => {
      let data = await API.getPostDetails(postId);
      dispatch(setPostDetails(data));
  }
}
export const editPost = (editPostData) => {
  return async (dispatch) => {
      let data = await API.editPost(editPostData);
      dispatch(setEditPost(data));
      dispatch(addEditPostAC(data));
  }
}
export const delPost = (delPostData) => {
  return async (dispatch) => {
      let data = await API.editPost(delPostData);
      // if (data.status = 200) {
      //   dispatch(delPostAC()); 
      //   console.log('Del Success !') 
      // }
      dispatch(delPostAC())
      dispatch(delPostFromPosts(delPostData))
  }
}

export default postDetailsReducer;