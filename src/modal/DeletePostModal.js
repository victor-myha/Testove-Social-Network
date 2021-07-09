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
const DeletePostModal = (props) => {
    
    return(
        <div>
            <Portal>
            <div className={s.modalOverlay}>
                <div className={s.modalWindow}>
                    <div className={s.modalHeader}>
                        <div className={s.modalTitle}>{props.title}</div>
                        <span title="Close" className={s.modalClose} onClick={props.modalDelCancel}>X</span>
                    </div>
                    <div className={s.modalBody}>
                        <div className={s.modalText}>{props.modalText}</div>
                    </div>
                    <div className={s.modalFooter}>
                        <button onClick={props.modalDelSubmit} className={s.Submit}>Підтвердити</button>
                        <button onClick={props.modalDelCancel} className={s.Cancel}>Скасувати</button>
                    </div>
                </div>
            </div>
            </Portal>
           
        </div>
        
    )
}
export default DeletePostModal;