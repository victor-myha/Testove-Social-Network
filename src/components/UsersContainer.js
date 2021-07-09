import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import s from '../styles/UsersContainer.module.css';
import {requestUsers} from '../redux/usersReducer';
import {NavLink} from "react-router-dom";
import userPhoto from '../img/user.png'

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers();
    }
    render() {
    return(
        <div className={s.mainContentWrapper}>
            
            <div className={s.UsersContainer}>{this.props.users.map((u)=>{
                return <div className={s.UserCard}>
                    <div className={s.imgWrapper}><img  src={userPhoto}/></div>
                    <div className={s.userInfo}>
                        <div className={s.name}>{`${u.name} (${u.username})`}</div>
                        <div className={s.company}>{`Work at: ${u.company.name}`}</div>
                        <div className={s.contacts}>{`Contacts: Email: ${u.email} Phone: ${u.phone}`}</div>
                        <div className={s.website}>{`Website: ${u.website}`}</div>
                        <div className={s.address}>{`Address: ${u.address.street},${u.address.suite},${u.address.city}`}</div>
                        <NavLink to={`/posts/${u.id}`}><button className={s.usersBtn}>Posts</button></NavLink>
                    </div>
                    
                </div>
            })}</div>
        </div>
    )
}
}
let mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
    }
}
let mapDispatchToProps = (dispatch) =>{
    
    return {
        requestUsers: () => dispatch(requestUsers()),
        
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)