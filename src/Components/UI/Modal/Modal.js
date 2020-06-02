import React from "react";
import styles from './Modal.module.css'
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.show !== nextProps.show) || (this.props.children !== nextProps.children);
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
                <div className={styles.Modal}
                     style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'}}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;