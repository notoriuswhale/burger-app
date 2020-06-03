import React from "react";

import styles from "./Checkout.module.css"
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(props.location.search)
        const ingredients = {};
        let price =0;
        for (let ingredient of query.entries()) {
            if(ingredient[0] === 'price') price = +ingredient[1];
            else ingredients[ingredient[0]] = +ingredient[1];
        }
        this.state = {
            ingredients: ingredients,
            price: price,
        }

    }

    checkoutCloseHandler = () => {
        this.props.history.push('/');
    }
    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 canceled={this.checkoutCloseHandler}
                                 continued={this.checkoutContinueHandler}/>
                                 <Route path={'/checkout/contact-data'}
                                        render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.price} {...props}/>} />

            </div>
        );
    }
}

export default Checkout