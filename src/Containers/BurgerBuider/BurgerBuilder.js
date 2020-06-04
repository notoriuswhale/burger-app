import React, {Component} from "react";
import axiosInst from "../../API/FirebaseDatabase";

import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BurgerControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spiner from "../../Components/UI/Spiner/Spiner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 0.9,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }
    componentDidMount() {
        axiosInst.get('/ingredients.json')
            .then(resp => {
                this.setState({
                    ingredients: resp.data,
                });
                this.updatePurchasable();
            }).catch(err => {
                this.setState({error: true})
        });
        // console.log(this.props);
    }

    addIgredientHandler = (type) => {
        this.setState((prevState) => {
            let newIngredients = {...prevState.ingredients};
            newIngredients[type] += 1;
            let newTotalPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return {
                ingredients: newIngredients,
                totalPrice: newTotalPrice,
            }
        });
        this.updatePurchasable();
    }

    subtractIgredientHandler = (type) => {
        this.setState((prevState) => {
            let ingredients = {...prevState.ingredients};
            if (ingredients[type] <= 0) return null;
            ingredients[type] -= 1;
            let newTotalPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return {
                ingredients: ingredients,
                totalPrice: newTotalPrice,

            }
        });
        this.updatePurchasable();
    }
    updatePurchasable = () => {
        this.setState((prevState) => {
            let totalIngredients = Object.values(prevState.ingredients).reduce((sum, el) => sum + el, 0)
            return {
                purchasable: totalIngredients > 0,
            };
        });
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
        //alert('You continue!')

        let queryParams = [];
        for(let ingr in this.state.ingredients){
                queryParams.push(encodeURIComponent(ingr) +  '=' + encodeURIComponent(this.state.ingredients[ingr]))
        }
        queryParams.push(encodeURIComponent('price') +  '=' + encodeURIComponent(this.state.totalPrice.toFixed(2)))

        this.props.history.push('/checkout?' + queryParams.join('&'));
    }

    render() {
        let modalMessage = null;

        let burger = this.state.error ? <p>There was some error</p> : <Spiner/>;
        if (this.state.ingredients) {
            burger = (<React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIgredientHandler}
                    subtractIgredient={this.subtractIgredientHandler}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    onPurchase={this.purchaseHandler}/>
            </React.Fragment>);
            modalMessage = <OrderSummary ingredients={this.state.ingredients}
                                         price={this.state.totalPrice}
                                         onPurchaseContinue={this.purchaseContinueHandler}
                                         onPurchaseDismiss={this.purchaseCloseHandler}/>;
        }
        if (this.state.loading) {
            modalMessage = <Spiner/>;
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

export default withErrorHandler(BurgerBuilder, axiosInst);