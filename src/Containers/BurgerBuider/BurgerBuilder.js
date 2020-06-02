import React, {Component} from "react";
import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BurgerControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 0.9,
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    addIgredientHandler = (type) => {
        this.setState((prevState) => {
            let newIngredients = {...prevState.ingredients};
            newIngredients[type] += 1;
            let newTotalPrice = prevState.totalPrice+INGREDIENT_PRICES[type];
            return {
                ingredients: newIngredients,
                totalPrice: newTotalPrice,
            }
        });
        this.updatePurchasable();
    }

    subtractIgredientHandler = (type) => {
        this.setState((prevState) =>{
            let ingredients = {...prevState.ingredients};
            if(ingredients[type] <= 0) return null;
            ingredients[type] -= 1;
            let newTotalPrice = prevState.totalPrice-INGREDIENT_PRICES[type];
            return {
                ingredients: ingredients,
                totalPrice: newTotalPrice,

            }
        });
        this.updatePurchasable();
    }
    updatePurchasable = () => {
        this.setState((prevState) => {
            let totalIngredients = Object.values(prevState.ingredients).reduce((sum, el) => sum+el , 0)
            return {
                purchasable: totalIngredients>0,
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
        alert('You continue!')
    }

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCloseHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  price={this.state.totalPrice}
                                  onPurchaseContinue={this.purchaseContinueHandler}
                                  onPurchaseDismiss={this.purchaseCloseHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIgredientHandler}
                    subtractIgredient={this.subtractIgredientHandler}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    onPurchase={this.purchaseHandler}/>

            </React.Fragment>
        );
    }
}

export default BurgerBuilder