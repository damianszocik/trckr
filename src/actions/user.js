import {
    message
} from 'antd';
import * as firebase from 'firebase'

export function socialAuth(selectedProvider) {
    return dispatch => {
        let provider;
        switch (selectedProvider) {
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case 'twitter':
                provider = new firebase.auth.TwitterAuthProvider();
                break;
        }
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(responseData => {
                message.success('You have been successfuly logged.', 6);
                dispatch(successfulAuth(responseData.user))
            })
            .catch(error => {
                message.error(error.message, 6);
                dispatch(failedAuth(error));
            })
    }
}

export function emailLogin(email, password) {
    return dispatch => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                message.error(error.message, 6);
                dispatch(failedAuth(error))
            })
    }
}

export function emailSignup(email, password) {
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error);
                message.error(error.message, 6);
                dispatch(failedAuth(error));
            })
    }
}


export function logOut() {
    return dispatch => {
        firebase.auth().signOut().then(responseData => {
                message.success('You have been logged out.', 5);
                dispatch(successfulLogOut())
            })
            .catch(error => {
                message.error(error.message, 6);
                dispatch(failedAuth(error));
            })
    }
}

export function successfulAuth(user) {
    return {
        type: 'SUCCESSFUL_AUTH',
        user
    }
}

export function successfulLogOut() {
    return {
        type: 'SUCCESSFUL_LOGOUT'
    }
}

export function failedAuth(error) {
    return {
        type: 'FAILED_AUTH',
        error
    }
}