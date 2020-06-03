import React from "react";

import Burger from "../Burger/Burger";
import styles from "./CheckoutSummary.module.css"
import Button from "../UI/Button/Button";

function CheckoutSummary(props) {

    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType={'Danger'} clicked={props.canceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continued}>CONTINUE</Button>

        </div>
    );
}

export default CheckoutSummary;