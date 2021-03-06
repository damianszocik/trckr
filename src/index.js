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
import './styles/themeOverrides.sass';
import AuthWrapper from './containers/authWrapper'

ReactDOM.render( < Provider store = {
            store
        } > < AuthWrapper / > < /Provider>, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: http://bit.ly/CRA-PWA
        serviceWorker.register();