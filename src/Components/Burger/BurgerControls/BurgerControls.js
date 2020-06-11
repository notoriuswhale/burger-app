import React from "react";
import styles from './BurgerControls.module.css'
import BurgerControl from "./BurgerControl/BurgerControl";

const BurgerControls = (props) => {

    let burgerControlsRender = [];
    for(let ingredient in props.ingredients){
        burgerControlsRender.push(
            <BurgerControl label={ingredient}
                           disabled={props.ingredients[ingredient] <= 0}
                           addClick={() => props.addIngredient(ingredient)}
                           substractClick={() => props.subtractIgredient(ingredient)}
                           key={ingredient}/>);
    }

    return (

        <div className={styles.BurgerControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {burgerControlsRender}
            <button className={styles.OrderButton}
                    onClick={props.onPurchase}
                    disabled={!props.purchasable}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
        </div>
    )
}

export default BurgerControls;