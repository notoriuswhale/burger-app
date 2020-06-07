import React, {Component} from "react";
import axiosInst from "../../API/FirebaseDatabase";

import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BurgerControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spiner from "../../Components/UI/Spiner/Spiner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    updatePurchasable = () => {
        let totalIngredients = Object.values(this.props.ingredients).reduce((sum, el) => sum + el, 0);
        return totalIngredients > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    }

    purchaseCloseHandler = () => {
        this.setState({
            purchasing: false,
        });
    }

    purchaseContinueHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout' );
    }

    render() {
        let modalMessage = null;
        let burger = null;
        if (this.props.ingredients) {
            burger = (<React.Fragment>
                <Burger ingredients={this.props.ingredients}/>
                <BurgerControls
                    ingredients={this.props.ingredients}
                    addIngredient={this.props.onIngredientAdd}
                    subtractIgredient={this.props.onIngredientRemove}
                    totalPrice={this.props.price}
                    purchasable={this.updatePurchasable()}
                    onPurchase={this.purchaseHandler}/>
            </React.Fragment>);
            modalMessage = <OrderSummary ingredients={this.props.ingredients}
                                         price={this.props.price}
                                         onPurchaseContinue={this.purchaseContinueHandler}
                                         onPurchaseDismiss={this.purchaseCloseHandler}/>;
        }
        if (this.props.loading) {
            modalMessage = <Spiner/>;
            burger = <Spiner/>;
        }
        if(this.props.error){
            burger = <p>Can't load ingredients!</p>
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCloseHandler}>
                    {modalMessage}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.burgerBuilder.loading,
        error: state.burgerBuilder.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchIngredients: () => dispatch(actions.fetchIngredients()),
        onIngredientAdd: (ing) => dispatch(actions.ingredientAdd(ing)),
        onIngredientRemove: (ing) => dispatch(actions.ingredientRemove(ing)),
        purchaseInit: () => dispatch(actions.purchaseInit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInst));