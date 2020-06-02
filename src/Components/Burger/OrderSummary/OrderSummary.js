import React from "react";
import Button from "../../UI/Button/Button";


const OrderSummary = ({ingredients, price, ...props}) => {
    const ingredientSummary = [];
    for(let ingredient in ingredients){
        ingredientSummary.push(
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}} >{ingredient}</span>:{ingredients[ingredient]}
            </li>);
    }
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingrediants:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.onPurchaseDismiss}>CANCEL</Button>
            <Button btnType='Success' clicked={props.onPurchaseContinue}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default OrderSummary;