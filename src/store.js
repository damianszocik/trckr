import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import ReduxThunk from 'redux-thunk';


import {
    loadStore,
    saveStore
} from './store/localStorage'

import {
    firebaseRef
} from './store/firebase'

import reducers from './reducers'

const savedStore = loadStore();
if (savedStore) {
    // firebaseRef.set(savedStore);
}
export let store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// store.subscribe(() => {
// saveStore(store.getState());
// firebase don't accept undefined properties - stringify and then parse to cut off all undefined properties
// firebaseRef.set(JSON.parse(JSON.stringify(store.getState())));
// })