import React from "react";

import styles from "./Input.module.css"

const Input = (props) => {
    let input = null;
    const classes = [styles.InputElement]
    if(!props.valid && props.touched){
        classes.push(styles.Error)
    }
    switch (props.inputType) {
        case 'input':
            input = <input className={classes.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case 'textarea':
            input = <textarea className={classes.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case 'select':
            input = (
                <select className={classes.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => {
                        return <option key={option.value}
                                       value={option.value}>{option.displayValue}</option>
                    })}
                </select>
            );
            break;
        default:
            input = <input className={classes.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }


    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {input}
        </div>
    );
}

export default Input