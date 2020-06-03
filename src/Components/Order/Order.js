import React from "react";

import styles from "./Order.module.css";

function Order(props) {
    const ingredients = [];
    for(let ingr in props.ingredients){
        ingredients.push(<span key={ingr} className={styles.Ingredient}>{ingr} ({props.ingredients[ingr]})</span>)
    }
    return (
      <div className={styles.Order}>
          <p>Ingredients: {ingredients}</p>
          <p>Price: <strong>USD {props.price}</strong></p>
      </div>
    );
}

export default Order;