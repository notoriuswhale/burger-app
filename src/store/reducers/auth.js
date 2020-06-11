import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirect: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_REDIRECT:
            return {
                ...state,
                authRedirect: action.link
            }
        case actionTypes.LOGOUT:
            return {
              ...state,
                token: null,
                userId: null,
            };
        case actionTypes.AUTH_START:
            return {...state, loading: true, error: null};
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                userId: action.userId,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;