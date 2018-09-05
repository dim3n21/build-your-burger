import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
          email: email,
          password: password,
          returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDuJALnzNFbXILf6YyN6uCwttmkiUZqF_A'

        if (!isSignup) {
          url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDuJALnzNFbXILf6YyN6uCwttmkiUZqF_A'
        };

        axios.post(url, authData)
          .then(response => {
            console.log(response.data);
            dispatch(authSuccess(response));
          })
          .catch(error => {
            console.log(error);
            dispatch(authFail(error));
          })
    };
};
