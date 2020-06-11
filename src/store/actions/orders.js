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

export const submitOrder = (order, token) => {
    return dispatch => {
        dispatch(submitOrderStart());
        axiosInst.post('/orders.json?auth='+token, order)
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

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId +'"'
        axiosInst.get('/orders.json'+queryParams)
            .then(resp => {
                dispatch(fetchOrdersSuccess(resp.data));
            }).catch(error => {
            dispatch(fetchOrdersFail(error));
        });
    }
}
