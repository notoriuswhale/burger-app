import * as actionTypes from './actionTypes'
import axiosInst from "../../API/FirebaseDatabase";

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}
export const purchaseFinish = () => {
    return {
        type: actionTypes.PURCHASE_FINISH,
    }
}

export const submitOrderStart = () => {
    return {
        type: actionTypes.SUBMIT_ORDER_START,
    }
}

export const submitOrderSuccess = () => {
    return {
        type: actionTypes.SUBMIT_ORDER_SUCCESS,
    }
}

export const submitOrderFail = (error) => {
    return {
        type: actionTypes.SUBMIT_ORDER_FAIL,
        error
    }
}

export const submitOrder = (order) => {
    return dispatch => {
        dispatch(submitOrderStart());
        axiosInst.post('/orders.json', order)
            .then(resp => {
                dispatch(submitOrderSuccess());
            }).catch(error => {
                dispatch(submitOrderFail(error));
            });
    }
}

export const fetchOrdersStart = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ORDERS_START,
        })
    }
};
export const fetchOrdersSuccess = (orders) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            orders: orders,
        })
    }
};
export const fetchOrdersFail = (error) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ORDERS_FAIL,
            error: error,
        })
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axiosInst.get('/orders.json')
            .then(resp => {
                dispatch(fetchOrdersSuccess(resp.data));
            }).catch(error => {
            dispatch(fetchOrdersFail(error));
        });
    }
}
