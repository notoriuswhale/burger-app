import React from "react";
import styles from "./backdrop.module.css"

const Backdrop = ({show, ...props}) => {
    return (
        show && <div className={styles.Backdrop} onClick={props.clicked}></div>
    );
}

export default Backdrop