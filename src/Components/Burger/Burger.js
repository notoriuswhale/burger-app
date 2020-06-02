import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";
import React from "react";

const Burger = (props) => {

    let renderIngredients = [];
    Object.keys(props.ingredients)
        .forEach((igKey) => {
            for (let i = 0; i < props.ingredients[igKey]; i++) {
                renderIngredients.push(<BurgerIngredient type={igKey} key={igKey + i}/>);
            }
        });
    if (renderIngredients.length === 0) {
        renderIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type={'breadTop'}/>
            {renderIngredients}
            <BurgerIngredient type={'breadBottom'}/>
        </div>

    );
};

export default Burger;