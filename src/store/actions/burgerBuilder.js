import * as actionTypes from './actionTypes'
import axiosInst from "../../API/FirebaseDatabase";

export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START,
    }
}

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients
    }
}

export const fetchIngredientsFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
        error
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        dispatch(fetchIngredientsStart());
        axiosInst.get('/ingredients.json')
            .then(resp => {
                dispatch(fetchIngredientsSuccess(resp.data));
            }).catch(err => {
                dispatch(fetchIngredientsFail(err));
        });
    }
}

export const ingredientAdd = (ingredient) => {
    return {
        type: actionTypes.INGREDIENT_ADD,
        ingredient,
    }
}

export const ingredientRemove = (ingredient) => {
    return {
        type: actionTypes.INGREDIENT_REMOVE,
        ingredient,
    }
}