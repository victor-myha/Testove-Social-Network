import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import postDetailsReducer from './postDetailsReducer';

let reducers = combineReducers(
    {
        usersReducer: usersReducer,
        postsReducer: postsReducer,
        postDetailsReducer: postDetailsReducer
    }
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;


export default store;

