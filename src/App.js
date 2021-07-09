import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import UsersContainer from './components/UsersContainer';
import PostsContainer from './components/PostsContainer';
import PostDetailsContainer from './components/PostDetailsContainer';

const App = () => {
 
  return (
    <div>
      <Route exact path='/' render={() => <Redirect to={'/users'}/>}/>
      <Route path='/users' render={()=><UsersContainer/>} />
      <Route path='/posts/:userId?' render={()=><PostsContainer/>} />
      <Route path='/postDetails/:postId?' render={()=><PostDetailsContainer/>} />
    </div>
  );
}

export default App;
