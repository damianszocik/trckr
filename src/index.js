import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
    Provider,
    connect
} from 'react-redux';
import {
    store
} from './store';
import './index.sass';
import 'antd/dist/antd.css';
import {
    message
} from 'antd';
import DefaultLayout from './containers/defaultLayout';
import LoginScreen from './containers/loginScreen'

const mapStateToProps = state => {
    return {
        storeUser: state.user
    };
}

const AuthWrapper = connect(mapStateToProps, undefined)(function (props) {
    const {
        authUser: {
            uid
        },
        authUser: {
            emailVerified
        },
        authUser: {
            email
        }
    } = props.storeUser;
    if (uid && emailVerified) {
        localStorage.removeItem(email);
        message.success('You have been successfuly logged.', 6);
        return ( < DefaultLayout / > )
    } else {
        return ( < LoginScreen / > )
    }
});



ReactDOM.render( < Provider store = {
            store
        } > < AuthWrapper / > < /Provider>, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: http://bit.ly/CRA-PWA
        serviceWorker.unregister();