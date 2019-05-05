import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
    Provider
} from 'react-redux';
import {
    store
} from './store';
import './index.sass';
import 'antd/dist/antd.css';
import DefaultLayout from './layouts/default';
import LoginScreen from './containers/loginScreen'


ReactDOM.render( < Provider store = {
            store
        } > < LoginScreen / > < /Provider>, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: http://bit.ly/CRA-PWA
        serviceWorker.unregister();