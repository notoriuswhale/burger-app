import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (authData) => {
    localStorage.setItem("token", authData.idToken);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem(
        "exparationDate",
        new Date().getTime() + authData.expiresIn * 1000
    );
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("exparationDate");
    return {
        type: actionTypes.LOGOUT,
    };
};

export const checkAuthTimeout = (exparationTime) => {
    return (dispatch) => {
        setTimeout(() => dispatch(logout()), exparationTime);
    };
};

export const auth = (email, password, signUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD89RfP4cy_YvJGNXpXgea6AooxMeaqXeY";
        if (!signUp)
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD89RfP4cy_YvJGNXpXgea6AooxMeaqXeY";
        axios
            .post(url, authData)
            .then((responce) => {
                console.log(responce.data);
                dispatch(authSuccess(responce.data));
                console.log(responce.data.expiresIn);
                dispatch(checkAuthTimeout(responce.data.expiresIn * 1000));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error));
            });
    };
};

export const setAuthRedirect = (link) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        link: link,
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const exparationDate = localStorage.getItem("exparationDate");
        const exparationTime = exparationDate - new Date().getTime();
        console.log(exparationTime);
        if (token && exparationTime > 0) {
            dispatch(
                authSuccess({
                    idToken: token,
                    localId: userId,
                    expiresIn: exparationTime / 1000,
                })
            );
            dispatch(checkAuthTimeout(exparationTime));
        } else {
            dispatch(logout());
        }
    };
};
