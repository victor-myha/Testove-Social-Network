import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import s from '../styles/PostsContainer.module.css';
import {withRouter} from "react-router-dom";
import {requestUserPosts,addNewPost} from '../redux/postsReducer';
import {setPostItemInfo} from '../redux/postDetailsReducer';
import {NavLink} from "react-router-dom";
import Modal from '../modal/Modal';
import * as axios from "axios";

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen:false};
      }
    componentDidMount() {
        let userId = Number(this.props.match.params.userId);
        if (!userId) {
            alert("Error, can`t find posts of this user :(")
        }
        this.props.getUserPosts(userId);
    }
    showModal = () => {
        this.setState({
            modalOpen:true
        })
    }

    modalCancel = () => {
        this.setState({
            modalOpen:false
        })
    }

    modalSubmit = (newPostData,event) => {
        event.preventDefault();
        this.setState({
            modalOpen:false
        })
        this.props.addPost(newPostData)
        
    }
    render() {
        let userId = Number(this.props.match.params.userId);
    return(
        <div>
            <div className={s.postsWrapper}>
            <div className={s.postsContainer}>
                {this.props.userPosts.map((p)=>{
                    return <div className={s.postItem}>
                        <div className={s.title}>{p.title}</div>
                        <hr></hr>
                        <div className={s.body}>{p.body}</div>
                        <NavLink to={`/postDetails/${p.id}`}><button className={s.postsBtn} onClick={()=>this.props.PostDetailsInfo(p) }>Post Details</button></NavLink>
                        
                    </div>
                })}
            </div>
            <div><button className={s.AddPostBtn} onClick={this.showModal}>Add Post</button></div>
        </div>

        {this.state.modalOpen &&
            <Modal userId={userId} userPosts={this.props.userPosts} title='Додавання нового поста' modalCancel={this.modalCancel} modalSubmit={this.modalSubmit}/>
        }
        </div>
    )
}
}
let mapStateToProps = (state) => {
    return {
        userPosts: state.postsReducer.posts,
    }
}
let mapDispatchToProps = (dispatch) =>{
    
    return {
        getUserPosts: (userId) => dispatch(requestUserPosts(userId)),
        PostDetailsInfo: (postItemInfo) => dispatch(setPostItemInfo(postItemInfo)),
        addPost: (newPostData) => dispatch(addNewPost(newPostData)),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(PostsContainer);