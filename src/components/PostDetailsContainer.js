import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from "react-router-dom";
import {requestPostDetails,editPost,delPost} from '../redux/postDetailsReducer';
import {NavLink} from "react-router-dom";
import s from '../styles/PostDetailsContainer.module.css';
import EditPostModal from '../modal/EditPostModal';
import DeletePostModal from '../modal/DeletePostModal';
import userPhoto from '../img/user.png';
import editIcon from '../img/edit.png';
import deleteIcon from '../img/delete.png';

class PostDetailsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen:false,delModalOpen:false,};
      }
    componentDidMount() {
        let postId = this.props.match.params.postId;
        if (!postId) {
            alert("Error, can`t find full information about this post :(")
        }
        this.props.getPostDetails(postId);
    }
    showModal = () => {
        this.setState({
            modalOpen:true,
        })
    }
    showDelModal = () => {
        this.setState({
            delModalOpen:true,
        })
    }
   
    modalSubmit = (editPostData) => {
        this.setState({
            modalOpen:false
        })
        this.props.editPost(editPostData)
       console.log('modalSubmit',editPostData)
    }
    modalDelSubmit = () => {
        this.setState({
            delModalOpen:false
        })
        this.props.delPost(this.props.postItemInfo[0])
       console.log('modal DEL Submit',this.props.delPost(this.props.postItemInfo[0]))
    }
    modalDelCancel = () => {
        this.setState({
            delModalOpen:false
        })
    }
    render() {
        let postId = this.props.match.params.postId;
    return(
        <div className={s.postItemWrap}>
            <div className={s.postsContainer}>
                {this.props.postItemInfo[0] ?
                    this.props.postItemInfo.map((pI)=>{
                        return <div className={s.postItem}>
                            <div className={s.titleWrap}>
                                <div className={s.title}>{pI.title}</div>
                                <div className={s.btnPannel}>
                                    <button className={s.postsBtn} onClick={this.showModal}><img  src={editIcon}/></button>
                                    <button className={s.postsBtn} onClick={this.showDelModal}><img  src={deleteIcon}/></button>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={s.body}>{pI.body}</div>
                        </div>
                    })
                    : <h3>Пости відсутні</h3>
                }
            </div>
            
            
            <div className={s.commentsWrap}>
                <div className={s.commentsContainer}>
                    <hr/>
                    <div><h3>Comments:</h3></div>
                        <div>
                            {this.props.postDetails.map((d)=>{
                                return <div className={s.commentCard}>
                                    <div className={s.commentatorInfo}>
                                        <div className={s.userPhotoComments}><img src={userPhoto}/></div>
                                        <div className={s.commentInfo}>
                                            <div>{d.name}</div>
                                            <div>{d.email}</div>
                                        </div>
                                    </div>
                                    <div className={s.commentMessage}>
                                        <div>{d.body}</div>
                                    </div>
                                </div>
                            })}
                        </div>
                </div>
            </div>
            
            {this.state.modalOpen &&
            <EditPostModal modalOpen={this.state.modalOpen}  postId={postId} postItemInfo={this.props.postItemInfo} title='Редагування поста' modalCancel={this.modalCancel} modalSubmit={this.modalSubmit}/>
        }
            {this.state.delModalOpen &&
            <DeletePostModal  postId={postId} postItemInfo={this.props.postItemInfo} title='Ви справді хочете видалити пост ?' modalDelCancel={this.modalDelCancel} modalDelSubmit={this.modalDelSubmit}/>
        }
            
        </div>
    )
}
}
let mapStateToProps = (state) => {
    return {
        postDetails: state.postDetailsReducer.postDetails,
        postItemInfo: state.postDetailsReducer.postItemInfo,
    }
}
let mapDispatchToProps = (dispatch) =>{
    
    return {
        getPostDetails: (postId) => dispatch(requestPostDetails(postId)),
        editPost: (editPostData) => dispatch(editPost(editPostData)),
        delPost: (delPostData) => dispatch(delPost(delPostData)),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(PostDetailsContainer);