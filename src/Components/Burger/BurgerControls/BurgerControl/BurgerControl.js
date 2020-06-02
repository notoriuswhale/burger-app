import React from "react";
import styles from './BurgerControl.module.css'

const BurgerControl = ({label, ...props}) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{label}</div>
            <button className={styles.Less}
                    onClick={props.substractClick}
                    disabled={props.disabled}>Less</button>
            <button className={styles.More}
                    onClick={props.addClick}>More</button>
        </div>
    );
}

export default BurgerControl;