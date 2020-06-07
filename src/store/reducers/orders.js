import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchasing: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchasing: true,
                error: false,
            };
        // case actionTypes.PURCHASE_FINISH:
        //     return {
        //         ...state,
        //         purchasing: false,
        //     };
        case actionTypes.SUBMIT_ORDER_START:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.SUBMIT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchasing: false,
            };
        case actionTypes.SUBMIT_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state
    }
};

export default reducer;