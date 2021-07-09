import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.css'


class Portal extends React.Component {
    el = document.createElement('div');

    componentDidMount(){
        document.body.appendChild(this.el);
    }
    componentWillUnmount(){
        document.body.removeChild(this.el);
    }
    render(){
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}
class Modal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId:Number(this.props.userId) ,
            id: Number(this.props.userPosts.length)+1,
            title: "",
            body: ""
            }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.modalSubmit(this.state, event)
    }
    handleChanges = (event) =>{
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    render(){
        return(
            <div>
                <Portal>
                <div className={s.modalOverlay}>
                    <div className={s.modalWindow}>
                        <div className={s.modalHeader}>
                            <div className={s.modalTitle}>{this.props.title}</div>
                            <span title="Close" className={s.modalClose} onClick={this.props.modalCancel}>X</span>
                        </div>
                        <div className={s.modalBody}>
                           
                            <form className={s.form} onSubmit={this.handleSubmit}>
                                <input className={s.formInput} type="text" name="title" value={this.state.title} onChange={this.handleChanges} placeholder="Type Post Title"/>
                                <textarea className={s.formTextArea} type="text" name="body" value={this.state.body} onChange={this.handleChanges} placeholder="Type Body Title"/>
                                <div className={s.modalFooter}>
                                    <button type="submit" className={s.Submit}>Зберегти</button>
                                    <button onClick={this.props.modalCancel} className={s.Cancel}>Скасувати</button>
                                </div>
                            </form>
                            
                        </div>
                        
                    </div>
                </div>
                </Portal>
                
            </div>
            
        )
    }
    
}
export default Modal;