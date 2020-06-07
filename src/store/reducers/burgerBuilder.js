import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    loading: false,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.5,
    meat: 0.9,
};

 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: action.ingredients,
                totalPrice: 4
            };
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.INGREDIENT_ADD:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            };
        case actionTypes.INGREDIENT_REMOVE:
            let ingCount = state.ingredients[action.ingredient];
            if(ingCount <=0) return state;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: ingCount - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
            };
        default:
            return state;
    }
};

export default reducer;