import {
    createStore
} from 'redux';

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
    firebaseRef.set(savedStore);
}
export let store = createStore(reducers, (savedStore || {}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
    saveStore(store.getState());
    firebaseRef.set(store.getState());
})