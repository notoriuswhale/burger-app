import React from "react";

import styles from "./Checkout.module.css";
import axiosInst from "../../API/FirebaseDatabase";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import Spiner from "../../Components/UI/Spiner/Spiner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {purchaseFinish} from "../../store/actions";

class Checkout extends React.Component {

    componentWillUnmount() {
        this.props.purchaseFinish();
    }

    checkoutCloseHandler = () => {
        this.props.history.push('/');
    }
    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        let content = <Redirect to='/'/>;

        //need to change if ingredients is not null but are all 0 then redirect to '/'

        if (this.props.ingredients) {
            content = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     canceled={this.checkoutCloseHandler}
                                     continued={this.checkoutContinueHandler}/>
                    <Route path={'/checkout/contact-data'}
                           component={ContactData}/>
                </div>);
        }
        if (this.props.loading) content = <Spiner/>;
        if (this.props.error) content = <p>Can't send order!</p>
        if (!this.props.purchasing) content = <Redirect to='/'/>;
        return content
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        loading: state.orders.loading,
        error: state.orders.error,
        purchasing: state.orders.purchasing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseFinish: () => dispatch(purchaseFinish()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Checkout, axiosInst));